"use strict";

import React from 'react';
import FaFile from 'react-icons/lib/fa/file'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from 'react-icons/lib/fa/edit'
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button } from 'react-md';

const style = { maxWidth: 500 }
const style2 = { height: '200px' }


export class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <Card style={style} className="md-block-centered">


                <Grid className="grid-example" >
                    <Cell size={3}>
                        <Media aspectRatio="1-1">
                            <img src={this.props.movie.posters.detailed} alt={this.props.movie.title} />
                        </Media>
                    </Cell>
                    <Cell size={7}/>
                    <Cell size={1}>
                        <Button className="md-cell--right" icon><FaEdit/></Button>
                    </Cell>
                    <Cell size={1}>
                        <Button className="md-cell--right" icon><FaTrash/></Button>
                    </Cell>
                    <Cell size={1}>&nbsp;</Cell>
                </Grid>

                <CardTitle title={this.props.movie.title} subtitle={this.props.movie.year} />

                <CardText>
                    <p>
                        {this.props.movie.mpaa_rating}
                    </p>
                    <p>
                        {this.props.movie.synopsis}
                    </p>
                </CardText>
            </Card>






        );
    }
}