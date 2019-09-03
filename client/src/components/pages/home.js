import React, { useEffect } from 'react';
import { Slide, Caption, Slider } from 'react-materialize';


const Home = () => {

    return (
        <Slider>
            <Slide image={<img />}>
                <Caption>
                    <h3>
                        This is our big Tagline!
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Here's our small slogan.
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img />}>
                <Caption placement="left">
                    <h3>
                        Left Aligned Caption
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Here's our small slogan.
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img />}>
                <Caption placement="right">
                    <h3>
                        Right Aligned Caption
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Here's our small slogan.
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img />}>
                <Caption>
                    <h3>
                        This is our big Tagline!
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Here's our small slogan.
                    </h5>
                </Caption>
            </Slide>
        </Slider>
    );
};

export default Home;
