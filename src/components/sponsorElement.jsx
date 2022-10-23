import React from "react"
import styled from "styled-components";

const S = {
    SponsorContainer: styled.div`
        display: flex;
        margin-right: 8em;
    `,
    Image: styled.img`
        max-height: 4em;
    `
}

export const SponsorElement = (data) => {

    const sponsorLogo = "sponsors/logo_" + data.value + ".png";

    return (
        <>
            <S.SponsorContainer>
                <S.Image src={sponsorLogo} alt={data.alt}/>
            </S.SponsorContainer>
        </>
    )
}