import FileUpload from '../components/FileUpload';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>You must be signed in to upload videos</h1>
      </div>
     
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome {session.user?.name || 'User'}</h1>
      <FileUpload />
    </div>
  );
}
