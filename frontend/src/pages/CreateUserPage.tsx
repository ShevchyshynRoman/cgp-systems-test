import { UserCreateForm } from '../components/UserCreateForm.tsx';

interface Props {
  setActiveTab: (tab: number) => void;
}

export function CreateUserPage({ setActiveTab }: Props) {
  return <UserCreateForm onSuccess={() => setActiveTab(0)} />;
}
