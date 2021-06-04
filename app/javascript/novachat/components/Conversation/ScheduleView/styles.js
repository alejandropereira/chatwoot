import styled from 'styled-components';
import variables from '../../../utils/variables';

const styles = {};

styles.Form = styled.form`
  input {
    flex: 1;
    padding: 11px 10px;
    border: 1px solid #e1e1e1;
    border-right: none;
    outline: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    ${sent =>
      sent &&
      `
    border-radius: 5px;
    padding-right: 36px;
  `}
    box-shadow: inset 0 0 7px #E1E1E1;
    font-family: ${variables.MainFontFamily};
  }
`;

styles.Button = styled.button`
  background: ${variables.BrandMainColor};
  color: white;
  border: none;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 300ms;

  &:hover {
    opacity: 0.8;
  }
`;

styles.Panel = styled.div`
  border-top: 2px ${variables.BrandMainColor} solid;
  border-radius: 5px;
  padding: 18px 23px;
  margin: 0 0 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  word-break: break-word;
  box-shadow: 0px 0px 17px -8px rgb(0 0 0 / 50%);
`;

styles.TimeItem = styled.div`
  border: 1px solid #2a1688;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  color: #2a1688;
  margin-bottom: 10px;
  transition: all 300ms;
  cursor: pointer;
  flex: 1;

  &:hover {
    color: white;
    background: #2a1688;
  }
`;

styles.Confirm = styled.div`
  border: 1px solid #2a1688;
  background: #2a1688;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  color: #2a1688;
  margin-bottom: 10px;
  transition: all 300ms;
  color: white;
  cursor: pointer;
  flex: 1;
  margin-left: 10px;
`;

styles.TimeItems = styled.div`
  padding-bottom: 60px;
`;

styles.Heading = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 0px 20px;
  border-bottom: 1px solid #efefef;
  margin-bottom: 20px;

  strong {
    font-size: 1.3rem;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: ${variables.BrandMainColor};
  }
`;

styles.Wrapper = styled.div`
  height: 100%;
  padding: 25px;
  overflow-y: scroll;

  .dayName {
    text-align: center;
    width: 100%;
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
  }

  h2 {
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    margin-top: 25px;
    margin-bottom: 20px;
  }

  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;

    &--doubleView {
      width: 700px;

      .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;

        > * {
          width: 50%;
          margin: 0.5em;
        }
      }
    }

    &,
    & *,
    & *:before,
    & *:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    button {
      margin: 0;
      border: 0;
      outline: none;

      &:enabled {
        &:hover {
          cursor: pointer;
        }
      }
    }

    &__navigation {
      height: 44px;
      margin-bottom: 1em;

      &__label__labelText {
        font-size: 1.9em;
      }

      button {
        min-width: 44px;
        background: none;

        &:enabled {
          &:hover,
          &:focus {
            background-color: rgb(230, 230, 230);
          }
        }

        &[disabled] {
          color: rgb(214, 214, 214);
        }
      }
    }

    &__month-view {
      &__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75em;

        &__weekday {
          padding: 0.5em;
        }
      }

      &__weekNumbers {
        font-weight: bold;

        .react-calendar__tile {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75em;
          padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
        }
      }

      &__days {
        &__day {
          &--weekend {
            color: rgb(209, 0, 0);
          }

          &--neighboringMonth {
            color: rgb(117, 117, 117);
          }
        }
      }
    }

    &__year-view,
    &__decade-view,
    &__century-view {
      .react-calendar__tile {
        padding: 2em 0.5em;
      }
    }

    &__tile {
      max-width: 100%;
      text-align: center;
      border-radius: 100%;
      padding: 1em 0.75em;
      background: none;

      &:disabled {
        color: rgb(214, 214, 214);
      }

      &:enabled {
        &:hover,
        &:focus {
          color: white;
          background-color: ${variables.BrandMainColor};
        }
      }

      &--now {
        @bgcolor: lighten(rgb(220, 220, 0), 30%);
        background: @bgcolor;

        &:enabled {
          &:hover,
          &:focus {
            background: lighten(@bgcolor, 10%);
          }
        }
      }

      &--hasActive {
        @bgcolor: lighten(rgb(0, 110, 220), 30%);
        background: @bgcolor;

        &:enabled {
          &:hover,
          &:focus {
            background: lighten(@bgcolor, 10%);
          }
        }
      }

      &--active {
        background: ${variables.BrandMainColor};
        color: white;

        &:enabled {
          &:hover,
          &:focus {
            background: lighten(@bgcolor, 10%);
          }
        }
      }
    }

    &--selectRange {
      .react-calendar__tile {
        &--hover {
          background-color: rgb(230, 230, 230);
        }
      }
    }
  }
`;

export default styles;
