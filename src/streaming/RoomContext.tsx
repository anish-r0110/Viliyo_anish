import React from 'react';

const RoomContext = React.createContext();

export default RoomContext;

export function withRoomContext(Component : any)
{
	console.log("🚀 ~ Component:", Component)

	return (props : any) => ( // eslint-disable-line react/display-name
		<RoomContext.Consumer>
			{(roomClient) => <Component {...props} roomClient={roomClient} />}
		</RoomContext.Consumer>
	);
}
