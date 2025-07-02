import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import PersonPinTwoToneIcon from '@mui/icons-material/PersonPinTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import StyleTwoToneIcon from '@mui/icons-material/StyleTwoTone';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import UserProfile from '../UserDashboardComponents/UserProfile';
import SubjectFilterQuiz from '../QuizCardsComponents/SubjectFilterQuiz';
import { useQuizCard } from '../../Context/QuizCardCrudContext';
import UserPasswordUpdate from '../../Services/UserPasswordUpdate';

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/userprofile');
  const demoWindow = window ? window() : undefined;

  const { quizcards } = useQuizCard();

  // Handle loading state
  if (!quizcards) {
    return <div>Loading quiz data...</div>;
  }

  // Extract unique subjects from quiz cards
  const uniqueSubjects = React.useMemo(() => {
    const subjectsSet = new Set();
    quizcards.forEach((group) => {
      if (group.subject) {
        subjectsSet.add(group.subject.toLowerCase());
      }
    });
    return Array.from(subjectsSet);
  }, [quizcards]);

  // Dynamically generate navigation
  const navigation = React.useMemo(() => {
    const subjectChildren = uniqueSubjects.map((subject) => ({
      segment: subject,
      title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Cards`,
      icon: <StyleTwoToneIcon />,
    }));

    return [
      { kind: 'header', title: 'Main items' },
      { segment: 'userprofile', title: 'User Profile', icon: <PersonPinTwoToneIcon /> },
      { kind: 'divider' },
      { kind: 'header', title: 'Analytics' },
      {
        segment: 'subjects',
        title: 'Subjects',
        icon: <LibraryBooksTwoToneIcon />,
        children: subjectChildren,
      },
      {
        segment:'passwordupdate',
        title:"Passwor Update"
      }
    ];
  }, [uniqueSubjects]);

  // Render the correct page component
  const renderContent = () => {
    if (router.pathname === '/userprofile') {
      return <UserProfile />;
    }

    if (router.pathname.startsWith('/subjects/')) {
      const subject = router.pathname.split('/')[2];
      return <SubjectFilterQuiz subject={subject} />;
    }

    if(router.pathname === '/passwordupdate'){
      return <UserPasswordUpdate/>
    }

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}><Skeleton height={14} /></Grid>
        <Grid item xs={12}><Skeleton height={14} /></Grid>
        <Grid item xs={4}><Skeleton height={100} /></Grid>
        <Grid item xs={8}><Skeleton height={100} /></Grid>
        <Grid item xs={12}><Skeleton height={150} /></Grid>
        <Grid item xs={12}><Skeleton height={14} /></Grid>
        <Grid item xs={3}><Skeleton height={100} /></Grid>
        <Grid item xs={3}><Skeleton height={100} /></Grid>
        <Grid item xs={3}><Skeleton height={100} /></Grid>
        <Grid item xs={3}><Skeleton height={100} /></Grid>
      </Grid>
    );
  };

  return (
    <AppProvider
      navigation={navigation}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {renderContent()}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
