import React, {Component} from 'react'
import {Layout} from 'antd'

import './App.css'
import Dashboard from "./components/Dashboard";

class App extends Component {
    render() {
        return (
            <Layout className={'App'}>
                <Layout.Header className="App-header">
                    <h1 className={'App-title'}>Flight Delay Dashboard</h1>
                </Layout.Header>
                <Layout.Content>
                    <Dashboard/>
                </Layout.Content>
            </Layout>
        );
    }
}

export default App;