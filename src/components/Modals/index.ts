import { registerModal } from "./modalRegistry";
import LeadForm from "./LeadForm";
import SignupCustomerForm from './SignUpCustomerForm';
import LocalRankChecker from './localRankChecker';
registerModal('signupCustomer', SignupCustomerForm);
registerModal("leadForm", LeadForm);
registerModal("localRankChecker", LocalRankChecker);
// add more modals like this:
// registerModal("contactForm", ContactForm);
// registerModal("newsletter", NewsletterModal);
