import React, { Component } from 'react';
import { SideBar, Dropzone } from './child-components/index';
import './design.scss';

export class Design extends Component {

    /**
     * Hook to render the DOM
     */
    render() {
        return (
            <main className="design-page">
                <div className="wrapper">
                    <SideBar />
                    <Dropzone />
                </div>
                <div id="draggingPlaceholder"></div>
            </main>
        );
    }
}
