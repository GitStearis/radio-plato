import React, { PureComponent } from 'react';

import { Subscription } from 'rxjs';

import { isMobileOnly } from 'react-device-detect';

import PlayButton from '../PlayerControls/PlayButton/PlayButton';
import VolumeControls from '../PlayerControls/VolumeControls/VolumeControls';

import { playerService } from '../PlayerService';
import { PlayerProps } from '../interfaces';
import { PlayerTypes } from '../../enums';

import './PlayerComponent.css';


const ONAIR = 'onair';
const M3U = 'https://azura.radioplato.by/public/1/playlist.m3u'
const PLS = 'https://azura.radioplato.by/public/1/playlist.pls'

const copyToClipboard = (text: string) => {
    const dummy = document.createElement('textarea');

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
};

export class PlayerComponent extends PureComponent<PlayerProps> {
    state = {
        trackName: ''
    };
    subscription: Subscription | null = null;

    get isMainPlayer () {
        return this.props.playerType === PlayerTypes.Main;
    }

    componentDidMount () {
        this.subscribeOnPlayerStateChange();
        this.setState({
            trackName: playerService.trackName
        });
    }

    componentWillUnmount () {
        this.subscription?.unsubscribe();
    }

    onTrackChange (trackName: string) {
        if (isMobileOnly) {
            this.setState({ trackName });
        } else {
            const tracktitle = document.querySelector('p.track-title');

            tracktitle?.classList.remove('shown')
            tracktitle?.classList.add('hidden');
    
            setTimeout(() => { tracktitle?.classList.add('shown'); this.setState({ trackName }) }, 1000)
            setTimeout(() => tracktitle?.classList.remove('hidden'), 2000);
        } 
    }

    subscribeOnPlayerStateChange () {
        this.subscription = playerService.subscribeOnTrackNameChanges((trackName: string) => this.onTrackChange(trackName));
    }

    handleTrackTitleClick () {
        const trackName = this.state.trackName;
        copyToClipboard(trackName);
        this.setState({ trackName: 'Copied!' });
        setTimeout(() => this.setState({ trackName }), 1000)
    }
    
    renderMainPlayer (trackName: string) {
        return (
            <>
                <div className='controls-container'>
                    <PlayButton playerType={ this.props.playerType }/>
                    <VolumeControls />
                </div>
                <div className='onair-line'>
                    <p className='onair'>{ ONAIR }</p>
                    <div className='stream-links-container'>
                        <a href={ M3U } target="blank">M3U</a>
                        <p>/</p>
                        <a href={ PLS } target="blank">PLS</a>
                    </div>
                </div>
                <p className='track-title'>{ trackName }</p>
            </>
        );
    }

    renderHeaderPlayer (trackName: string) {
        return (
            <>
                <PlayButton playerType={ this.props.playerType }/>
                <div className='track-title' title='Click to copy the track name to the clipboard' onClick={ () => this.handleTrackTitleClick() }>
                    <div className='overlay'></div>
                    <p>{ trackName }</p>
                </div>
                <VolumeControls />
            </>
        );
    }

    renderPlayer () {
        const {
            trackName
        } = this.state;

        return this.isMainPlayer ?
            this.renderMainPlayer(trackName) :
            this.renderHeaderPlayer(trackName);
    }

    render () {
        return (
            <div className={ `${ this.props.playerType }-player ${ isMobileOnly ? 'mobile' : 'desktop' }` }>
                { this.renderPlayer() }
            </div>
        );
    }
}

export default PlayerComponent;
