import React, { Component } from 'react';
import Terminal from 'terminal-in-react';

function TerminalTab(props) {
	// showMsg = () => 'Hello World'

	return (
		<div
			style={{
				width: "100%",
			}}
		>
			<Terminal
				hideTopBar={true}
				allowTabs ={false}
				color='green'
				backgroundColor='black'
				barColor='black'
				style={{ fontWeight: "bold", fontSize: "1em" }}
				commands={{
					'open-google': () => window.open('https://www.google.com/', '_blank'),
				}}
				descriptions={{
					'open-google': 'opens google.com',
				}}
				msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
			/>
		</div>
	);
}

export default TerminalTab;
