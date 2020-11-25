import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect';

import { Seo } from '../shared/wrappers/seo/Seo'
import GalleryComponent from '../gallery/GalleryComponent';
import NewsListComponent from '../news/NewsListComponent';
import { ScheduleComponent } from '../shared/schedule/ScheduleComponent';
import { BASIC_SEO_IMG } from '../shared/constants';

import { NewsListTypes } from '../shared/enums';

import './StartPageComponent.css';

const INDEX_SEO_TITLE = 'From Minsk with ❤'
const INDEX_SEO_DESCRIPTION = 'Independent internet radio based in Minsk (Belarus). We stream classic bangers and authentic world music as well as modern indie and rhythmic DJ edits.'

export class StartPageComponent extends Component {
    render() {
        return (
            <div className={ `start-page-container ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                    <Seo meta={{
                            title: INDEX_SEO_TITLE,
                            description: INDEX_SEO_DESCRIPTION,
                            thumbnail: BASIC_SEO_IMG
                        }}
                    />
                { isMobileOnly ? null : <GalleryComponent /> }
                <NewsListComponent type={ NewsListTypes.Simple }/>
                <ScheduleComponent />
            </div>
        );
    }
}

export default StartPageComponent;