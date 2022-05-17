import styled from "styled-components";

export const UserProfle = styled.div`
 width: 100vw;
 height: 100vh;
 /* display: flex; */
 justify-content: center;
 align-items: 'center';
 position: relative;
 .BenefitsSkimsTitle{
         padding: 15px  0px !important;
 }
`;
export const UserProfleBg = styled.div`
    background-color: #F8EDD5;
    width: 100%;
    padding: 20px 10px 10px 10px;
    height: 85px;
    border-bottom: 2px solid black;
    .profile-heading {
        display: flex;
        justify-content: space-between;
        .full-name {
           font-family: Nunito !important;
           font-size: 16px;
           font-style: normal;
           font-weight: 700;
           line-height: 22px;
           letter-spacing: 0em;
           text-align: left;
           color: #670000;
           padding-bottom: 3px;
           text-transform: uppercase;
       }
       .edit-profile-text{
           font-family: Nunito !important;
           font-size: 16px;
           font-style: normal;
           font-weight: 700;
           line-height: 22px;
           letter-spacing: 0em;
           padding-bottom: 3px;
           color: #E8814D;
           text-transform: uppercase;
        }
    }
    .mobile-number{
        font-family: Nunito;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
        color: #808285;
        margin-bottom: 16px;
        display: inline-block;
    }
    .email-address {
        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #808285;
        padding-bottom: 3px;
        margin-left: 10px;
        display: inline-block;
    }
`;
export const UserIcon = styled.div`
     width: 100px;
     height: 100px;
     padding: 3px;
     border-radius: 50%;
     background: linear-gradient(69.65deg, #670000 30.72%, #e8814d 87.46%);
     > img{
         width: 100%;
         height: 100%;
         min-width: 100%;
     }
`;

export const EarlyUsersBoxWrapper = styled.div`
    width: 100%;
    margin:30px 0 30px;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 70px;
    .BenefitsSkimsTitle{
        padding: 10px 0 0px 0px;
        width: 90%;
        margin: auto;
        p{
            color: #670000;
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
            font-family: Nunito;
            height: 100%;
        }
    }
`;

export const BenefitsSkims = styled.div`
    border-top: 0.5px solid #C1C1C1;
    padding-top: 30px;
    overflow-y: scroll;
    padding-bottom: 20px;
    .SkimItem{
        display: flex;
        padding: 8px 0;
        align-items: center;
        width: 93%;
        margin: auto;
        img{
            width: 24px;
            height: 24px;
        }
        p{
            margin-left: 10px;
            color: #808285;
            font-weight: bold;
            font-family: Nunito;
            font-size: 14px;
            line-height: 24px;
            height: auto;
        }
    }
`;

export const PopBenifits = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-radius: 30px 30px 0px 0px;
    z-index: 1;
    width: 100%;
    box-shadow: 0 19px 38px rgb(0 0 0 / 80%), 0 15px 12px rgb(0 0 0 / 50%);
    height: 65%;
    max-width: 550px;
`;

export const AccountDescWrapper = styled.div`
    width: 100%;
    margin:0 0 30px;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 70px;
`;

export const AccountDescriptionRow = styled.div`
border-bottom: 0.5px solid #C1C1C1;
padding-top: 10px;
overflow-y: scroll;
padding-bottom: 16px;
.heading-title {
    display: flex;
    padding: 5px 0;
    align-items: center;
    width: 90%;
    margin: auto;
    img {
        margin-left: 10px;
        width: 15px;
        height: 15px;
    }
    p{
        margin-left: 10px;
        color: #670000;
        font-family: Nunito !important;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;    
        line-height: 24px;                          
    }
    b {
        margin-right: 15px;
        position: relative;
        left: 64%;
    }
    .right-arrow-btn {
        background-color: transparent;
        border-radius: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: none;
        color: #626262;
        position: relative;
        left: 55%;
      }
}
.box-progress {
    background-color: #f8edd5;
    border-radius: 10px;
    padding: 5px 20px 20px 30px;
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
     .box-container {
        margin: 1rem;
    }
    .progress {
        height: 0px !important;
        left    : 0;
        bottom  : 0;
        height  : 1px;
        width   : 100%;  /* or 100px */
        border: 1px solid rgba(128, 130, 133, 0.5);
    }
    .progress .progress-bar {
        position: relative;
        background-color: #670000;
    }
    .progress .progress-bar:before {
        content: "";
        position: absolute;
        z-index: 9999999;
        width: 96%;
        border-bottom: 1px solid #670000;
    }
    .progress .progress-bar:after {
        content: '\\2714';
        z-index: 999999999999;
        background: #670000;
        position: absolute;
        right: 0px;
        top: -8px;
        border-radius: 100%;
        width: 18.27px;
        height: 18px;
        color: white;
        border: 1px solid #670000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        font-weight: 900;
        line-height: initial;
    }
    .progress .progress-bar.info:after {
        content: '\\2139';
        pointer-events: none;
    }
    .progress .progress-value {
        font-family: Nunito !important;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 24px;
        display: block;
        color: #670000;
        position: absolute;
        right: 2px;
        top : -2px;
        display: flex;
        height: 41px;
        width: 10px;
        margin-top: 1px;
        align-items: center;
    }
    .progress .progress-value .tooltip-span{
        position: absolute;
        right: -3px;
        top: -8px;
        height: 20px;
        width: 20px;
    }
    .progress{
        position: relative;
        height: 1px;
        overflow: visible;
        margin-bottom: 10px;
        background-color: #808285;
    }
    .progress::before {
       border: 5px solid #670000;
       content: " ";
       background: #fff;
       position: absolute;
       left: -18px;
       top: -8px;
       border-radius: 100%;
       width: 18.27px;
       height: 18px;
       color: #000;
    }
    .progress:after {
        border: 5px solid #670000;
        content: " ";
        background: #fff;
        position: absolute;
        left: 100%;
        top: -8px;
        border-radius: 100%;
        width: 18.27px;
        height: 18px;
        color: #ccc;
    }
    .progress.progress-hide:after {
        content: none;
        border: none;
    }
    .progress.progress-hide{
        height : 1px!important;
        border: none;
    }
    .progress-left-value {
       font-family: Nunito;
       font-style: normal;
       font-weight: 600;
       font-size: 12px;
       line-height: 24px;
       color: #808285;
       display: block;
       position: absolute;
       top: 8px;
       left: -12px;
    }
    .progress-right-value {
       font-family: Nunito;
       font-style: normal;
       font-weight: 600;
       font-size: 12px;
       line-height: 24px;
       display: block;
       color: #808285;
       position: absolute;
       top: 8px;
       left: 101%;
    }
}
`;

export const ReferralCodeBoxWrapper = styled.div`
    width: 100%;
    margin:30px 0 30px;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 0px;
    float: center;
    .referral-code-image {
        padding: 20px
    }
    .referral-info-text {
        margin-top: 10px;
        padding-left: 20px;
        b {
            font-family: Nunito;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #670000;
            opacity: 0.8;
        }
    }
    .referral-code-info {
        margin: 10px;
        padding: 10px;
        p {
            color: #808285;
        }
        ol{
            color: #808285;
        }
        .referral-info-text {
            padding-left: 0;
        }
    }
    .referral-code-container {
        margin-top: 23px;
        padding-left: 20px;
        p {
            font-family: Nunito;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #808285;
            opacity: 0.8;
        }
        .referral-code-box {
            margin-top: 10px;
            background: #FFFFFF;
            border: 1px dashed #C1C1C1;
            box-sizing: border-box;
            width: 95%;
            height: 55px;
            padding: 14px 15px 14px 26px;
            display: flex;
            justify-content: space-between;
            b {
                font-family: Nunito;
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 27px;
                display: flex;
                align-items: center;
                color: #000000;
            }
            .copy-btn {
                background-color: transparent;
                border-radius: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
                border: none;
                position: relative;
              }
            img {
                width: 25px;
                height: 25px;
            }
        }
    }
    .sub-menu {
        margin-top: 35px;
        padding-left: 20px;
        a {
            font-family: Nunito;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            color: #808285;
            opacity: 0.8;
            float:left;
            clear:left;
        }
    }
    .invite-friend-container {
        width: 100%;
        max-width: 550px;
        position: fixed;
        bottom: 10px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 2;
        margin: 0 auto;
        .invite-friend-box {
            text-align: center;
            width: 100%;
            margin-bottom: 26px;
            .btn-invite-friend {
                width: 100%;
                max-width: 150px;
                height: 35px;
                background-color: #e8814d;
                border-radius: 4.5rem;
                line-height: 35px;
                vertical-align: middle;
                display: block;
                margin: 0 auto;
                p {
                    font-family: Nunito;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 12px;
                    line-height: 24px;
                    align-items: center;
                    color: #FFFFFF;
                }
            }
        }
    }
`;