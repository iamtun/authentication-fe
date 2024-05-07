import React, { useEffect } from 'react';
import localStorageService from '../../services/localStorageService';
import { APP_KEY } from '../../common/constant';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import userService from '../../services/userService';
import { Button, Spin } from 'antd';

import styles from './Home.module.css';
import authService from '../../services/authService';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorageService.getValue(APP_KEY.token)) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading } = useSWR('/users', () => userService.getUserInfo());

  return (
    <div>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <main className={styles.container}>
          <p>{JSON.stringify(data)}</p>
          <Button
            onClick={() => {
              const refreshToken = localStorageService.getValue(
                APP_KEY.refreshToken,
              );
              if (refreshToken) {
                authService
                  .revokeToken(refreshToken)
                  .then(() => {
                    localStorageService.deleteValue(APP_KEY.token);
                    localStorageService.deleteValue(APP_KEY.refreshToken);
                    navigate('/login');
                  })
                  .catch();
              }
            }}
          >
            Logout
          </Button>
        </main>
      )}
    </div>
  );
};

export default HomePage;
