const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_API_KEY
});

const hubspotService = {
  async createLead({ email, serviceRequested }) {
    try {
      // Create or update a contact
      const contact = await hubspotClient.crm.contacts.basicApi.create({
        properties: {
          email,
          service_requested: serviceRequested,
          lead_source: 'Chat Widget',
          lifecycle_stage: 'lead'
        }
      });

      // Create a deal associated with the contact
      const deal = await hubspotClient.crm.deals.basicApi.create({
        properties: {
          dealname: `${serviceRequested} Inquiry - ${email}`,
          pipeline: 'default',
          dealstage: 'appointmentscheduled',
          amount: '0',
        }
      });

      // Associate the deal with the contact
      await hubspotClient.crm.deals.associationsApi.create(
        deal.id,
        'contacts',
        contact.id,
        'deal_to_contact'
      );

      return {
        contactId: contact.id,
        dealId: deal.id
      };
    } catch (error) {
      console.error('HubSpot API Error:', error);
      throw new Error('Failed to create lead in HubSpot');
    }
  }
};

module.exports = { hubspotService }; 