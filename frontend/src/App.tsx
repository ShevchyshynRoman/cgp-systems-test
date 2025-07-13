import { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import { UsersPage } from './pages/UsersPage.tsx';
import { CreateUserPage } from './pages/CreateUserPage.tsx';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
        aria-label="User management tabs"
        sx={{ mb: 2 }}
      >
        <Tab label="Users" />
        <Tab label="Create User" />
      </Tabs>

      <Box>
        {activeTab === 0 && <UsersPage />}
        {activeTab === 1 && <CreateUserPage setActiveTab={setActiveTab} />}
      </Box>
    </Container>
  );
}

export default App;
