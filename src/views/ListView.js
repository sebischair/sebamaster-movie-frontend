"use strict";

import React from 'react';

import ItemsService from '../services/ItemsService';

import List from './../components/List';


export default class ListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount() {
        this.setState({ loading: true });

        ItemsService.getItems().then((data) => {
                this.setState({
                    data: [...data],
                    loading: false
                });
            });
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<List data={this.state.data} />);
    }
}
