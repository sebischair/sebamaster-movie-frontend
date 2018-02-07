"use strict";

import React from 'react';

import ItemsService from '../services/ItemsService';

import Item from '../components/Item';

export default class ItemView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {
                id: props.match.params.id
            }
        };
    }

    componentWillMount() {
        this.setState({ loading: true });

        ItemsService.getItem( this.state.data.id)
            .then((data) => {
                this.setState({
                    data: Object.assign({},data),
                    loading: false
                });
            })
            .catch((e) => {
                this.setState({
                    data: {},
                    loading: false
                });
                console.log(e); // "oh, no!"
            })
    }


    render() {
        if (this.state.loading) {
            return <h2>Loading...</h2>;
        }
        return (<Item data={this.state.data} />);
    }
}