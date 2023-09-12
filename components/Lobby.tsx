"use client"
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Lobby } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getLobbies } from '@/redux/slices/lobbySlice';
import JoinRoom from './JoinRoom';
import { useEffect } from 'react';
export default function LobbyComponent ({id}: {id:string}) {
    const lobby = useQuery(api.lobby.getLobby) as Lobby[];
    const lobbies = useAppSelector(state => state.lobby.lobbies)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(getLobbies(lobby))      
    }, [lobby])

    if (!lobby) {
      return (
        <div className='max-w-[600px] bg-slate-300 px-4 py-2'>
          Loading...
        </div>
      )
    }

    if (lobbies.length === 0) {
      <div className='max-w-[600px] bg-slate-300 px-4 py-2'>
          No Active Rooms
        </div>
    }

    return (
      <section className='max-w-[600px] bg-customBg px-4 py-2 text-white'>
        <div className='flex flex-row w-full bg-customSec mb-2 font-semibold px-4 py-1'>
          <div className='basis-1/4 text-center'>TYPE</div>
          <div className='basis-1/4 text-center'>HOST</div>
          <div className='basis-1/4 text-center'>GUEST</div>
          <div className='basis-1/4 text-center'>ACTION</div>
        </div>
        {(lobbies)?.map((lobby: Lobby) => {
            const { _id, host, guest, gameType } = lobby
            return (
                <div key={_id} className='flex flex-row bg-customSec mb-2 px-4 py-1'>
                    <div className='basis-1/4 text-center'>{gameType}</div>
                    <div className='basis-1/4 text-center'>{host}</div>
                    <div className='basis-1/4 text-center'>{guest || 'empty'}</div>                    
                    <JoinRoom id={_id} userId={id} />                  
                </div>
            )
        })}
      </section>
    );
  };
  