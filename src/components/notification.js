import React, {useState} from 'react';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {Button} from 'react-bootstrap'

const Notification = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
  
    const handleClick = event => {
      setShow(!show);
      setTarget(event.target);
    };
  
    return(
        <ButtonToolbar>
      <Button onClick={handleClick}>Holy guacamole!</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Popover bottom</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
        </Popover>
      </Overlay>
    </ButtonToolbar>
    )
}

export default Notification;