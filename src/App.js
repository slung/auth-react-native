import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component { 
    state = {loggedIn: null}

    componentWillMount() {

        // Initialize Firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyAubCkVNKyk5J-SGrex6ghnX_pDngEkIoo',
            authDomain: 'auth-react-naive.firebaseapp.com',
            databaseURL: 'https://auth-react-naive.firebaseio.com',
            projectId: 'auth-react-naive',
            storageBucket: 'auth-react-naive.appspot.com',
            messagingSenderId: '431704887429'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else { 
                this.setState({loggedIn: false});
            }
         });
     }

    renderContent() { 
        switch (this.state.loggedIn) { 
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log out
                        </Button>
                    </CardSection>);
                case false:
                return <LoginForm />;
            default: <Spinner size="large" />;
        }
    }
    
    render() { 
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;