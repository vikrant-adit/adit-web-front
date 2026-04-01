import DynamicForm from '@/components/forms/DynamicForm';
import { promoForm } from '../../../packages/schemas/forms/promoForm';
export default function TestPage() {
  return <DynamicForm schema={promoForm} />;
}