import React, { useState, createContext, useContext } from 'react';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        toggleDarkTheme,
        showSidebar,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
