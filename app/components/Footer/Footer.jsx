import Styles from './Footer.module.css'

import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={Styles['footer']}>
            <Link href="/" className={Styles['footer__logo']}>
                <span className={Styles['footer__logo-name']}>pindie</span>
                <span className={Styles['footer__logo-copyer']}>, XXI век</span>
            </Link>
            <ul className={Styles['social-list']}>
                <li className={Styles['social-list__item']}>
                    <a href="https://www.youtube.com" className={`button ${Styles['social-list__link']}`} >YT</a>
                </li>
                <li className={Styles['social-list__item']}>
                    <a href="https://vk.com/feed" className={`button ${Styles['social-list__link']}`}>ВК</a>
                </li>
                <li className={Styles['social-list__item']}>
                    <a href="https://web.telegram.org" className={`button ${Styles['social-list__link']}`}>TG</a>
                </li>
            </ul>
        </footer>
    )
}