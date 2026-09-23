import User from '../models/User.js';
import ContactMessage from '../models/ContactMessage.js';
import ProjectInquiry from '../models/ProjectInquiry.js';
import Payment from '../models/Payment.js';
import { memory, isMongo } from '../services/store.js';
import { ok } from '../utils/response.js';

export async function stats(req, res) {
	const data = isMongo()
		? {
				users: await User.countDocuments(),
				projectInquiries: await ProjectInquiry.countDocuments(),
				contactMessages: await ContactMessage.countDocuments(),
				payments: await Payment.countDocuments()
		  }
		: {
				users: memory.users.length,
				projectInquiries: memory.projects.length,
				contactMessages: memory.contacts.length,
				payments: memory.payments.length
		  };
	ok(res, data);
}
