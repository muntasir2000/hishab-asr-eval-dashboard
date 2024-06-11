import React, { createContext,useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const user = useTracker(() => Meteor.user(), []);

	const isLoggingIn = useTracker(() => Meteor.loggingIn(), []);

	const login = (email, password) => {
		return new Promise((resolve, reject) => {
			Meteor.loginWithPassword(email, password, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};

	const logout = () => {
		return new Promise((resolve, reject) => {
			Meteor.logout((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};

	return (
		<AuthContext.Provider value={ { user, isLoggingIn, login, logout } }>
			{ children }
		</AuthContext.Provider>
	);

}

export const useAuth = () => {
  return useContext(AuthContext);
};
