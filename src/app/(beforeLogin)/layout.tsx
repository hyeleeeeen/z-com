import {ReactNode} from 'react';
import styles from '@/app/(beforeLogin)/_component/main.module.css';

type Props = {children: ReactNode, modal: ReactNode } // 변수지정

export default function Layout( {children, modal}: Props) {
    return (
        <div className={styles.container}>
            {children} {/*page.tsx*/}
            {modal} {/*@modal의 page.tsx*/}
        </div>
    )
}