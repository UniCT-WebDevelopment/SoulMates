'use client';
import React, { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, Typography, Grid, IconButton, Divider, TextField, CircularProgress, Snackbar, Alert, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import EmailIcon from '@mui/icons-material/AlternateEmail';
import AgeIcon from '@mui/icons-material/CalendarMonth';
import PasswordIcon from '@mui/icons-material/Password';
import { useSession, signIn } from 'next-auth/react';

const ProfileDashboard = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [profileImage, setProfileImage] = useState(null);
  
  const [userData, setUserData] = useState({
    name: session?.user?.name || '',
    bio: session?.user?.bio || '',
    age:session?.user?.age || '',
    email: session?.user?.email || '',
    password: '',
    profileImageUrl: session?.user?.img || '',
  });

  useEffect(() => {
    if (session) {
      setUserData({
        name: session.user.name || '',
        bio: session.user.bio || '',
        age: session.user.age || '',
        email: session.user.email || '',
        profileImageUrl: session.user.img || '',
      });
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return <p>You are not logged in.</p>;
  }

  const handleEditClick = () => {
    if (isEditing) {
      handleSaveClick();
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      let profileImageUrl = userData.profileImageUrl;
  
      if (profileImage) {
        const reader = new FileReader();
        reader.readAsDataURL(profileImage);
        reader.onloadend = async () => {
          const base64data = reader.result;
  
          // Invia l'immagine come Base64 al server e ottieni l'URL dell'immagine
          const uploadResponse = await fetch('/api/users/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.user.id,
              profileImage: base64data,
            }),
          });
  
          if (uploadResponse.ok) {
            const data = await uploadResponse.json();
            profileImageUrl = data.img;
          } else {
            console.error('Error uploading image');
            return;
          }

          await updateUserProfile(profileImageUrl);
          await signIn('credentials', { redirect: false });
        };
      } else {
        await updateUserProfile(profileImageUrl);
        await signIn('credentials', { redirect: false });
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };
  
  const updateUserProfile = async (profileImageUrl) => {
    console.log(profileImageUrl);
    const response = await fetch('/api/users/userUpdateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
        updateData: {
          name: userData.name,
          bio: userData.bio,
          age: userData.age,
          email: userData.email,
          password: userData.password ? userData.password : undefined,
          img: profileImageUrl,
        },
      }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
    } else {
      throw new Error(result.error || 'Failed to update profile');
    }
  };
  
  return (
    <Card sx={{ height: 300, maxWidth: 800, margin: 'auto', padding: 3, boxShadow: 4, overflow: "scroll"}} className='rounded-lg backdrop-blur-lg bg-black/30 text-white'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} textAlign="center">
          <Avatar
            alt=""
            src={userData.profileImageUrl || ""}
            sx={{ width: 150, height: 150, margin: 'auto' }}
          />
          {isEditing && (
            <>
              <Button 
                variant="contained" 
                component="label" 
                sx={{
                  marginTop: 2,
                  backgroundColor: 'gray',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
              >
                Upload New Photo
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </>
          )}
          {isEditing ? (
            <TextField
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
            />
          ) : (
            <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
              {userData.name}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bio
              <IconButton onClick={handleEditClick}>
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </Typography>
            {isEditing ? (
              <TextField
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {userData.bio}
              </Typography>
            )}
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={4} textAlign="center">
                <IconButton>
                  <AgeIcon fontSize="large" />
                </IconButton>
                {isEditing ? (
                  <TextField
                    name="age"
                    value={userData.age}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="h6">{userData.age}</Typography>
                    <Typography variant="body2" color="text.secondary">Age</Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={4} textAlign="center">
                <IconButton>
                  <EmailIcon fontSize="large" />
                </IconButton>
                {isEditing ? (
                  <TextField
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography variant="text" className='text-xs'>{userData.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={4} textAlign="center">
                <IconButton>
                  <PasswordIcon fontSize="large" />
                </IconButton>
                {isEditing ? (
                  <TextField
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    placeholder="New Password"
                  />
                ) : (
                  <>
                    <Typography variant="h6">******</Typography>
                    <Typography variant="body2" color="text.secondary">Password</Typography>
                  </>
                )}
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
          </CardContent>
        </Grid>
      </Grid>
      {loading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProfileDashboard;
