import React from "react";
import styled from "styled-components";

const S = {
    ScheduleElementContainer: styled.div`
        display: flex;
    `,
    Time: styled.div`
        color: #a455df;
        font-size: 1.25em;
        font-weight: 500;
        letter-spacing: .1em;
        flex: 0;
        margin-top: .4em;
    `,
    LineElement: styled.div`
        margin-left: 1em;
        display: flex;
        flex-flow: column;
        height: 100%;
    `,
        TopLine: styled.div`
            position: relative;
            left: 6px;
            width: 4px;
            height: 1em;
            background-color: #a455df;
        `,
        Square: styled.div`
            position: relative;
            width: 1em;
            height: 1em;
            background-color: #a455df;
            transform: rotate(45deg);
        `,
        BottomLine: styled.div`
            position: relative;
            left: 6px;
            width: 4px;
            height: auto;
            flex: 1;
            background-color: #a455df;
        `,

    ElementInformation: styled.div`
        display: flex;
        flex-flow: column;
        margin-left: 2em;
        margin-top: .4em;
        
        letter-spacing: .1em;
    `,
        Title: styled.span`
            display: flex;
            font-size: 1.25em;
            font-weight: 400;
        `,
        Subtitle: styled.span`
            display: flex;
            font-size: 1em;
            font-weight: 400;
        `,
        Text: styled.span`
            margin: .75em 0;
        `,
}

export const Schedule = (data) => {

    return (
        <>
            <S.ScheduleElementContainer>
                <S.Time>
                    10:00
                </S.Time>
                <S.LineElement>
                    <S.TopLine />
                    <S.Square />
                    <S.BottomLine />
                </S.LineElement>
                <S.ElementInformation>
                    <S.Title>Test</S.Title>
                    <S.Subtitle>Litt mindre test men runde 3</S.Subtitle>
                    <S.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </S.Text>
                </S.ElementInformation>
            </S.ScheduleElementContainer>
        </>
    )
}