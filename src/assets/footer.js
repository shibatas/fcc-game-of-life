import React from 'react';
import house from './img/house.svg';
import ghLogo from './img/github-logo.svg';
import cpLogo from './img/codepen-logo.png';

const Footer = () => {
	return (
		<footer style={{textAlign:'center'}}>
			<hr style={{width: '90%'}}/>
		        <p>This is a <a href="" target="_blank" rel="noopener noreferrer">freeCodeCamp project</a>. The code can be found <a href="" target="_blank" rel="noopener noreferrer">here</a>.</p>
		        <p>Shohei Shibata &#9426; copyright 2017</p>
			<p>
				<a style={{margin: 15}} href="http://shoheishibata.com/categories/Programming/" target="_blank" rel="noopener noreferrer"><img src={house} alt="homepage" width="30" /></a>
				<a style={{margin: 15}} href="https://github.com/shibatas/" target="_blank" rel="noopener noreferrer"><img src={ghLogo} alt="github" width="30" /></a>
				<a style={{margin: 15}} href="https://codepen.io/Shohei51/" target="_blank" rel="noopener noreferrer"><img src={cpLogo} alt="codepen" width="30" /></a>
			</p>
		</footer>
	);
}

export default Footer;
