import React, { useState } from 'react';
import Drawer from 'Common/Components/Drawer';
import { Check, X } from 'lucide-react';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import {
    changeLayout,
    // changeLayoutSemiDark,
    changeSkin,
    changeLayoutMode,
    changeDirection,
    changeLayoutContentWidth,
    changeLeftsidebarSizeType,
    changeNavigation,
    changeLeftSidebarColorType,
    changeLayoutTopbarColor
} from "../slices/thunk";
import { LAYOUT_CONTENT_WIDTH, LAYOUT_DIRECTION, LAYOUT_MODE_TYPES, LAYOUT_SKIN, LAYOUT_TOPBAR_THEME_TYPES, LAYOUT_TYPES, LEFT_NAVIGATION_TYPES, LEFT_SIDEBAR_COLOR_TYPES, LEFT_SIDEBAR_SIZE_TYPES } from 'Common/constants/layout';

const RightSidebar = ({ handleToggleDrawer, isOpen }: any) => {
    const dispatch = useDispatch<any>();
    const selectLayoutState = (state: any) => state.Layout;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (layout: any) => ({
            layoutType: layout.layoutType,
            layoutSemiDarkType: layout.layoutSemiDarkType,
            layoutSkintype: layout.layoutSkintype,
            layoutModeType: layout.layoutModeType,
            layoutDirectionType: layout.layoutDirectionType,
            layoutContentWidthType: layout.layoutContentWidthType,
            layoutSidebarSizeType: layout.layoutSidebarSizeType,
            layoutNavigationType: layout.layoutNavigationType,
            layoutSidebarColorType: layout.layoutSidebarColorType,
            layoutTopbarColorType: layout.layoutTopbarColorType,
        })
    );
    // Inside your component
    const {
        layoutType,
        // layoutSemiDarkType,
        layoutSkintype,
        layoutModeType,
        layoutDirectionType,
        layoutContentWidthType,
        layoutSidebarSizeType,
        layoutNavigationType,
        layoutSidebarColorType,
        layoutTopbarColorType
    } = useSelector(selectLayoutProperties);

    const [isClicked, setIsClicked] = useState(layoutTopbarColorType === LAYOUT_TOPBAR_THEME_TYPES.DARK);

    const handleSemiDarkMode = () => {
        setIsClicked(!isClicked);

        if (isClicked) {
            dispatch(changeLayoutTopbarColor(LAYOUT_TOPBAR_THEME_TYPES.LIGHT));
            dispatch(changeLeftSidebarColorType(LEFT_SIDEBAR_COLOR_TYPES.LIGHT));
        } else {
            dispatch(changeLayoutTopbarColor(LAYOUT_TOPBAR_THEME_TYPES.DARK));
            dispatch(changeLeftSidebarColorType(LEFT_SIDEBAR_COLOR_TYPES.DARK));
        }
    };

    const updateHorizontalMenu = (value: any) => {
        const navbarMenu: any = document.querySelector(".app-menu");
        navbarMenu.classList.remove("group-data-[layout=horizontal]:opacity-0");
        dispatch(changeLayout(value));
    };

    return (
        <React.Fragment>
            <Drawer show={isOpen} onHide={handleToggleDrawer} id="customizerButton" drawer-end="true" className="fixed inset-y-0 flex flex-col w-full transition-transform duration-300 ease-in-out transform bg-white shadow ltr:right-0 rtl:left-0 md:w-96 z-drawer dark:bg-zink-600">
                <div className="flex justify-between p-4 border-b border-slate-200 dark:border-zink-500">
                    <div className="grow">
                        <h5 className="mb-1 text-16">Bimoo Settings</h5>
                        <p className="font-normal text-slate-500 dark:text-zink-200">Choose your themes & layouts etc.</p>
                    </div>
                    <div className="shrink-0">
                        <Drawer.Header data-drawer-close="customizerButton" className="transition-all duration-150 ease-linear text-slate-500 hover:text-slate-800 dark:text-zink-200 dark:hover:text-zink-50">
                            <X className="size-4"></X></Drawer.Header>
                    </div>
                </div>
                <Drawer.Body className="h-full p-6 overflow-y-auto">

                </Drawer.Body>
                <div className="flex items-center justify-between gap-3 p-4 border-t border-slate-200 dark:border-zink-500">
                </div>
            </Drawer>
        </React.Fragment>
    );
};

export default RightSidebar;
