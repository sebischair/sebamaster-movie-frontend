"use strict";

import React from 'react';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import { Card, Button } from 'react-md';
import { Link } from 'react-router-dom'

const style = { maxWidth: 500 };

export class MovieForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={style} className="md-block-centered">
                <form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" required />
                    </div>

                    <div>
                        <label htmlFor="year">Year</label>
                        <input id="year" type="number" min="1950" max="2050" required />
                    </div>

                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input id="rating" type="number" />
                    </div>

                    <div>
                        <label htmlFor="synopsis">Synopsis</label>
                        <input id="synopsis" type="text" />
                    </div>

                    <button id="submit" type="submit"><FaPlusCircle/></button>
                </form>
            </Card>
        );
    }
}


/*MovieForm.propTypes = {
    title: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    synopsis: PropTypes.string
}*/