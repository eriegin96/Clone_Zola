import { Link, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginTabs from '../components/LoginTabs';
import './loginPage.scss';
import '../components/loginComponents.scss';
import { AppContext } from '../../../context/AppProvider';

export default function LoginPage() {
	const { isVN, setIsVN } = useContext(AppContext);

	return (
		<div className="login__page">
			<div className="login__wrapper--1"></div>
			<div className="login__wrapper--2"></div>
			<div className="login__container">
				<Typography variant="h1" component="h1" className="login__logo">
					Zola
				</Typography>
				<Typography variant="body1" component="h2" className="login__description">
					{isVN ? 'Đăng nhập tài khoản Zola' : 'Sign in to Zola account'}
					<br />
					{isVN ? 'để kết nối với ứng dụng Zola Chat' : 'to connect to Zola Chat'}
				</Typography>
				<LoginTabs/>
				<Typography variant="body2" component="p" className="login__register">
					{isVN ? 'Bạn chưa có tài khoản? ' : "Don't have an account? "}
					<Link
						href="https://id.zalo.me/account/static/zalo-register.html"
						sx={{ fontWeight: 'bold' }}
					>
						{isVN ? 'Đăng ký ngay!' : 'Register now!'}
					</Link>
				</Typography>
				<div className="login__footer">
					<div className="login__langs">
						<Link
							underline="hover"
							className={isVN ? 'login__lang--active' : 'login__lang'}
							onClick={() => setIsVN(true)}
						>
							Tiếng Việt
						</Link>
						<Link
							underline="hover"
							className={isVN ? 'login__lang' : 'login__lang--active'}
							onClick={() => setIsVN(false)}
						>
							English
						</Link>
					</div>
					<Typography variant="caption" component="p">
						{isVN
							? 'Dùng tài khoản Zola để truy cập các ứng dụng của ZA'
							: "Use your Zola account to access ZA's applications"}
					</Typography>
					<ul>
						<li>
							<a href="http://zalo.me">
								<i className="login__footer__zalo"></i>
							</a>
						</li>
						<li>
							<a href="http://zingmp3.vn">
								<i className="login__footer__zingmp3"></i>
							</a>
						</li>
						<li>
							<a href="http://tv.zing.vn">
								<i className="login__footer__zingtv"></i>
							</a>
						</li>
						<li>
							<a href="http://zing.vn">
								<i className="login__footer__zing"></i>
							</a>
						</li>
						<li>
							<a href="http://baomoi.com">
								<i className="login__footer__baomoi"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
