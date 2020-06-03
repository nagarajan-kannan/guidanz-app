import React, { useState } from 'react';
import { DRAG_DROP } from '../../../helpers/drag-drop-helper';
import './dropzone.scss';

export function Dropzone() {

    const [currentActiveElem, setCurrentActiveElem] = useState(null); // Component State

    /**
     * Method to trigger onDragOver the dropzone
     * @param {Event} event 
     */
    const onDragOver = (event) => {
        event.preventDefault();
    };

    /**
     * Handle the functionlities when drop the draggable item on dropzone 
     * @param {Event} event 
     */
    const onDrop = (event) => {
        event.preventDefault();

        // Get the draggable cloned element
        const elementId = event.dataTransfer.getData(DRAG_DROP.STORAGE_KEY);
        const element = document.getElementById(elementId);

        if (element) {
            // Place the element on top of dropzone based on mouse points
            element.style.top = `${event.pageY - 80}px`;
            element.style.left = `${event.pageX - 80}px`;

            event.target.appendChild(element).focus();

            // Listener to handle the resizing
            element.addEventListener('focus', () => {
                initDragControl(element);
            });

            // Listener to handle remove the resizing
            element.addEventListener('blur', () => {
                const resizer = element.getElementsByClassName('resizer');

                if (resizer && resizer[0]) { // HTML Collection
                    resizer[0].remove();
                }
            });

            initDragControl(element);
        }
    };

    /**
     * Add the resizer and handle the resizing
     * @param {HTMLElement} element 
     */
    const initDragControl = (element) => {
        setCurrentActiveElem(element); // Update component state

        // Create and add resizer into the element
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        element.appendChild(resizer);

        // Listener to start and stop resizing
        resizer.addEventListener('mousedown', (event) => {
            event.preventDefault();

            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize)
        });

        /**
         * Inner function to update the elment width and height based on resizing
         * @param {Event} event 
         */
        function resize(event) {
            element.style.width = event.pageX - element.getBoundingClientRect().left + 'px';
            element.style.height = event.pageY - element.getBoundingClientRect().top + 'px';
        }

        /**
         * Inner function to remove the listeners
         */
        function stopResize() {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        }
    };

    /**
     * Delete the selected element from dropzone
     */
    const deleteCurrentActiveElem = () => {
        if (currentActiveElem) {
            currentActiveElem.remove(); // Remove the element from DOM
            setCurrentActiveElem(null)
        }
    };

    /**
     * Toggle the delete control
     */
    const options = currentActiveElem ? (
        <div className='options'>
            <span onClick={deleteCurrentActiveElem}>
                <i className='fa fa-trash-o' aria-hidden='true'></i>
            </span>
        </div>
    ) : null;

    /**
     * Render the JSX elements
     */
    return (
        <div className='desing-wrapper'>
            <section className='options-section'>
                {options}
            </section>

            <section className='dropzone-section'>
                <div className='dropzone-wrapper'>
                    <div className='dropzone-area'
                         tabIndex='0' // Make non-form elements to support for pseudo classes like focus, hover etc.
                         id='dropZoneArea'
                         onDragOver={onDragOver}
                         onDrop={onDrop}>
                    </div>
                </div>
            </section>
        </div>
    );
}
