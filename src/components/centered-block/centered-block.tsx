import styles from './centered-block.module.css';

type TInfoBlockProps = {
  children: React.ReactNode;
};

export const CenteredBlock = ({ children }: TInfoBlockProps): React.JSX.Element => {
  return (
    <section className={styles.main}>
      <div className={styles['container-centered']}>{children}</div>
    </section>
  );
};
