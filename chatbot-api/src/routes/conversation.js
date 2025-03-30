const express = require('express');
const { z } = require('zod');
const { openAIService } = require('../services/openai');
const { hubspotService } = require('../services/hubspot');

const router = express.Router();

// Validation schemas
const MessageSchema = z.object({
  message: z.string().min(1)
});

const LeadSchema = z.object({
  email: z.string().email(),
  serviceRequested: z.enum(['private_lessons', 'choreography', 'group_classes'])
});

// Chat conversation endpoint
router.post('/', async (req, res, next) => {
  try {
    const { message } = MessageSchema.parse(req.body);
    
    const response = await openAIService.createChatCompletion(message);
    
    // Check if the message contains potential lead information
    if (response.leadInfo) {
      try {
        await hubspotService.createLead(response.leadInfo);
      } catch (error) {
        console.error('Error creating lead in HubSpot:', error);
        // Continue with the conversation even if lead creation fails
      }
    }

    res.json({ reply: response.content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid request data', details: error.errors });
    } else {
      next(error);
    }
  }
});

// Lead capture endpoint
router.post('/lead', async (req, res, next) => {
  try {
    const leadData = LeadSchema.parse(req.body);
    const lead = await hubspotService.createLead(leadData);
    res.json({ success: true, lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid lead data', details: error.errors });
    } else {
      next(error);
    }
  }
});

module.exports = router; 