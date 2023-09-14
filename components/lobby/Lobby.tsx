"use client"
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Lobby } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getLobbies } from '@/redux/slices/lobbySlice';
import JoinRoom from './JoinRoom';
import { useEffect,  } from 'react';

const loaderData = new Array(5).fill(true)

export default function LobbyComponent ({id, showSheet}: {id:string; showSheet: () => void}) {
    const lobby = useQuery(api.lobby.getLobby) as Lobby[];
    const lobbies = useAppSelector(state => state.lobby.lobbies)
    const dispatch = useAppDispatch()


    useEffect(() => {
      dispatch(getLobbies(lobby))      
    }, [lobby])



    if (!lobby) {
      return (
        <section className='max-w-[600px] bg-customBg px-4 py-2  text-white h-[400px] overflow-y-auto'>
          <div className='select-none flex flex-row w-full bg-customSec mb-2 font-semibold px-4 py-2 text-lg '>
            <div className='basis-1/4 text-center'>TYPE</div>
            <div className='basis-1/4 text-center'>HOST</div>
            <div className='basis-1/4 text-center'>GUEST</div>
            <div className='basis-1/4 text-center'>ACTION</div>
          </div>
            <div className='h-full overflow-auto'>
                {loaderData.map((l,i) =>{
                    return (
                        <div key={i} 
                            style={{animationDelay: `${100*i}ms`}}
                            className={`flex flex-row bg-customSec mb-2 px-4 py-1 w-full h-[1.75rem] animate-pulse`}
                        >
                        </div>
                    )
                })}
            </div>
        </section>
      )
    }

    if (lobbies.length === 0) {
      return (<section className='relative max-w-[600px] bg-customBg px-4 py-2  text-white h-[400px] overflow-y-auto'>
      <div className='select-none top-0 sticky flex flex-row w-full bg-customSec mb-2 font-semibold px-4 py-2 text-lg z-10'>
        <div className='basis-1/4 text-center'>TYPE</div>
        <div className='basis-1/4 text-center'>HOST</div>
        <div className='basis-1/4 text-center'>GUEST</div>
        <div className='basis-1/4 text-center'>ACTION</div>
      </div>
      <p className='select-none text-center mt-4'>no active rooms found...</p>
    </section>)
    }

    return (
      <section className='relative max-w-[600px] bg-customBg px-4 py-2  text-white h-[400px] overflow-y-auto'>
        <div className='select-none top-0 sticky flex flex-row w-full bg-customSec mb-2 font-semibold px-4 py-2 text-lg z-10'>
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
                    <JoinRoom 
                      id={_id} 
                      userId={id} 
                      showSheet={showSheet}
                    />                  
                </div>
            )
        })}
      </section>
    );
  };
  