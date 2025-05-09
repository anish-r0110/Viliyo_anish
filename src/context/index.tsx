"use client";
import store from "@/store";
import React, { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Service as AlertProvider } from '../components/alert';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider store={store}>
      <AlertProvider>
            {children}
      </AlertProvider>
    </ReduxProvider>
  );
};

export default Provider;
