import React from 'react';
import { Link } from 'react-router-dom';

const SiteBreadcrumb = (props) => {
    const { pageTitle, parentCategory, pageCategory, pageName, breadcrumbsImg } = props;

    const breadcrumbsImgStyle = {
        backgroundImage: `url(${breadcrumbsImg})`,
        backgroundPosition: 'center center'
    }

    return (
        <>
            {/*Page Header Start*/}
            <section className="page-header">
                <div
                    className="page-header__bg"
                    style={breadcrumbsImgStyle}
                ></div>
                <div className="container">
                    <div className="page-header__inner">

                        {/* ✅ Breadcrumb Title - White */}
                        <h2 className="text-white font-bold">
                            {pageTitle ? pageTitle : 'Breadcrumbs'}
                        </h2>

                        <div className="thm-breadcrumb__box">
                            {/* ✅ Make breadcrumb text white */}
                            <ul className="thm-breadcrumb list-unstyled text-white">

                                <li>
                                    <Link to="/" className="text-white hover:text-pink-300 transition">
                                        {parentCategory ? parentCategory : 'Home'}
                                    </Link>
                                </li>

                                <li><span className="icon-angle-left text-white"></span></li>

                                {pageCategory ? (
                                    <>
                                        <li>
                                            <Link to="/" className="text-white hover:text-pink-300 transition">
                                                {pageCategory}
                                            </Link>
                                        </li>

                                        <li className="text-white">{pageName ? pageName : 'Page Name'}</li>
                                    </>
                                ) : (
                                    <li className="text-white">{pageName ? pageName : 'Page Name'}</li>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/*Page Header End*/}
        </>
    );
}

export default SiteBreadcrumb;
