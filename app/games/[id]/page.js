"use client"
import {
    getNormalizedGameDataById,
    isResponseOk,
    checkIfUserVoted,
    vote
} from '../../api/api-units';
import { endpoints } from "../../api/config";
import { Preloader } from '../../components/Preloader/Preloader';
import { GameNotFound } from '../../components/GameNotFount/GameNotFound';
import { useState, useEffect } from 'react';
import { useStore } from "@/app/store/app-store";
import Styles from './Game.module.css';


export default function GamePage(props) {
    const authContext = useStore();

    const [game, setGame] = useState(null);
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [isVoted, setIsVoted] = useState(false);

    // Получаем данные о пользователе и сохраняем их
    useEffect(() => {
        async function fetchData() {
            setPreloaderVisible(true);
            const game = await getNormalizedGameDataById(
                endpoints.games,
                props.params.id
            );
            isResponseOk(game) ? setGame(game) : setGame(null);
            setPreloaderVisible(false);
        }
        fetchData();
    }, []);

    useEffect(() => { // Данные о пользователе получаем из контекста authContext.user
        authContext.user && game ? 
        setIsVoted(checkIfUserVoted(game, authContext.user.id)) : 
        setIsVoted(false);
    }, [authContext.user, game]);


    const handleVote = async () => {
        const jwt = authContext.token
        let usersIdArray = game.users.length
          ? game.users.map((user) => user.id)
          : [];
        usersIdArray.push(authContext.user.id);
        // Сначала выполнили запрос на добавление голоса
        const response = await vote(
          `${endpoints.games}/${game.id}`,
          jwt,
          usersIdArray
        );
        // Только если запрос успешный,
        if (isResponseOk(response)) {
          // отображаем новое количество голосов
          setGame(() => {
            return {
              ...game,
              users: [...game.users, authContext.user],
            };
          });
          setIsVoted(true);
        }
      };

    return (
        <main className="main">
            {game ? (
                <>
                    <section className={Styles['game']}>
                        <iframe className={Styles['game__iframe']} src={game.link}></iframe>
                    </section>
                    <section className={Styles['about']}>
                        <h2 className={Styles['about__title']}>{game.title}</h2>
                        <div className={Styles['about__content']}>
                            <p className={Styles["about__description"]}>{game.description}</p>
                            <div className={Styles["about__author"]}>
                                <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
                            </div>
                        </div>
                        <div className={Styles["about__vote"]}>
                            <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span className={Styles["about__accent"]}>{game.users.length}</span></p>
                            <button
                                disabled={!authContext.isAuth || isVoted}
                                className={`button ${Styles["about__vote-button"]}`}
                                onClick={handleVote}>
                            
                                {isVoted ? "Голос учтён" : "Голосовать"}
                            </button>
                        </div>
                    </section>
                </>
            ) : preloaderVisible ? (
                <Preloader />
            ) : (
                <GameNotFound />
            )}
        </main>
    );
}