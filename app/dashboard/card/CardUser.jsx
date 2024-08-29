'use client'
import './card.css'
import Confetti from 'react-confetti';
import React, { useEffect, useState } from 'react';
import ActionButtons from './actionbuttons/ActionButtons';
import MoreButton from './morebutton/MoreButton';

const CardUser = ({session}) => {
  const [userInCard, setUserInCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [oppositeGender, setOppositeGender] = useState('');
  const [swipeEffect, setSwipeEffect] = useState(false);
  const [likeEffect, setLikeEffect] = useState(false);
  const [dislikeEffect, setDislikeEffect] = useState(false);
  const [matchMessageVisible, setMatchMessageVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(session?.user?.gender){
      setOppositeGender(session.user.gender.toLowerCase() === 'male' ? 'female' : 'male');
    }
  }, [session]);

  useEffect(() => {
    async function fetchCurrentIndex() {
      console.log("id", session.user.id);
      const res = await fetch(`/api/users/getCurrentIndex?userId=${session.user.id}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentIndex(data.currentIndex);
        console.log("current",data.currentIndex);
      } else {
        console.error('Failed to fetch current index');
      }
    }
  
    if (session?.user?.id) {
      fetchCurrentIndex();
    }
  }, [session]);

  useEffect(() => {
    async function fetchSequentialUser() {
      if (currentIndex === null || !oppositeGender) return; 

      const res = await fetch(`/api/users/sequential?index=${0}&gender=${oppositeGender}`);
      
      if (res.ok) {
        const data = await res.json();
        setUserInCard(data);
        setMessage('');
      } else {
        console.error('Failed to fetch user');
      }
    }

    fetchSequentialUser();
  }, [currentIndex, oppositeGender]);

  async function updateCurrentIndex(newIndex) {
    const userId = session.user.id;
    await fetch(`/api/users/updateIndex`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ userId, newIndex })
    });
  }

  function handleNextUser() {
    setSwipeEffect(true);

    setTimeout(() => {
      setSwipeEffect(false);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateCurrentIndex(newIndex); // Sincronizza subito con il server
    }, 600);
  }

  /*LikeButton */
  const handleLike = async () => {
    setLikeEffect(true);  
    
    setTimeout(async () => {
      setLikeEffect(false);  // Disattiva l'effetto del like
      const userId = session.user.id;
      const likedUserId = userInCard._id;  
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, likedUserId }),
      });
  
      const data = await res.json();
      if (data.success) {
        if (data.match) {
          setMessage("E' Match signori, si potrebbe inzuppare il biscottino!");
          setCardVisible(false);  // Nasconde la card
          setMatchMessageVisible(true);  // Mostra il messaggio di match
          setConfettiVisible(true);
  
          // Dopo 2 secondi, nasconde il messaggio e mostra la card successiva
          setTimeout(() => {
            setMatchMessageVisible(false);  // Nasconde il messaggio di match
            setConfettiVisible(false);
            setCardVisible(true);  // Mostra la card successiva
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            updateCurrentIndex(newIndex);
          }, 4000);  // Durata dell'effetto match
        } else {
          setMessage("Mi piace inviato");
          const newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
          updateCurrentIndex(newIndex);
        }
      } else {
        setMessage("Errore: " + data.error);
      }
    }, 1000);  // Durata dell'effetto like
  };
  

  /*DislikeButton */
  const handleDislike = () => {
    setDislikeEffect(true);

    setTimeout(() => {
      setDislikeEffect(false);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateCurrentIndex(newIndex);
    }, 500);
  }

  if (currentIndex === null || !userInCard) return <p>Loading...</p>;

  return (
    <>
      {confettiVisible && <Confetti />}
      
      {matchMessageVisible && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white text-4xl font-bold animate-rotate-and-color">
          It's a Match!
        </div>
      )}
  
      {cardVisible && (
        <div className={`card h-[85%] w-[30%] p-2 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/20
                         ${swipeEffect ? 'animate-swipe' : ''}
                         ${dislikeEffect ? 'animate-dislike' : ''}
                         ${likeEffect ? 'animate-like' : ''}`}>
          <div className='h-full relative'>
            <div className='flex justify-between absolute right-2'>
              <MoreButton />
            </div>
            <div className='h-full'>
              <img 
                src={userInCard.img} 
                alt={userInCard.name}
                className='object-cover h-full rounded-xl'
              />
            </div>
  
            <div className='absolute inset-0 flex flex-col justify-end'>
              <div className='p-4 bg-gradient-to-b from-transparent via-black/60 to-black/100 rounded-2xl'>
                <h1 className='text-2xl font-bold text-white'>{userInCard.name}</h1>
                <p className='text-sm text-white'>
                  {userInCard.bio}
                </p>
                <div className='mt-4'>
                  <ActionButtons  
                    onNextUser={handleNextUser} 
                    onLike={handleLike} 
                    onDislike={handleDislike}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
  
  
};

export default CardUser;
