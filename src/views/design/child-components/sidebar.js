import React from 'react';
import { v4 as uuid } from 'uuid';
import { DRAG_DROP } from '../../../helpers/drag-drop-helper';
import './sidebar.scss';

export function SideBar() {

    const shapes = [
        { id: uuid(), name: 'round.png' },
        { id: uuid(), name: 'square.png' },
        { id: uuid(), name: 'triangle.png' }
    ]; // Draggable items

    /**
     * Handle the dragging functionalities, when user stars dragging
     * @param {Event} event
     * @param {object | any} shape
     */
    const onDragStart = (event, shape) => {
        // Clone the dragging element
        const element = document.getElementById(shape.id);
        const clonedElement = element.cloneNode(true);

        // Set the new uuid for the cloned element
        const newUUID = uuid();
        clonedElement.setAttribute('id', newUUID);
        clonedElement.removeAttribute('draggable');

        setTimeout(() => {
            element.style.visibility = 'hidden'; // Hide the original dragging item    
        }); // Small timer to avoid flickering

        // Push the cloned element into the placeholder as backup
        const placeHolderElement = document.getElementById('draggingPlaceholder');
        placeHolderElement.appendChild(clonedElement);

        event.dataTransfer.setData(DRAG_DROP.STORAGE_KEY, newUUID); // Store cloned element as dragging data reference
    };

    /**
     * Restore the hidden element to visible mode after dragging is over
     * @param {object | any} shape 
     */
    const onDragEnd = (shape) => {
        document.getElementById(shape.id).style.visibility = 'visible';
    };

    /**
     * Render the JSX elements
     */
    return (
        <aside className='sidebar'>
            <div className='elements'>
                <h5>Shapes</h5>
                <div className='draggables'>
                    {shapes.map(shape => {
                        return (
                            <div className='draggable-item'
                                 tabIndex='0' // Make non-form elements to support for pseudo classes like focus, hover etc.
                                 draggable
                                 key={shape.id}
                                 id={shape.id}
                                 onDragStart={(e) => onDragStart(e, shape)}
                                 onDragEnd={() => onDragEnd(shape)}>
                                <img src={`/assets/images/${shape.name}`} alt='Draggable Item' />
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
