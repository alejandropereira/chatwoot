// Load all the controllers within this directory and all subdirectories.
// Controller files must be named *_controller.js.
import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import { Application } from 'stimulus';
import StimulusReflex from 'stimulus_reflex';
import { definitionsFromContext } from 'stimulus/webpack-helpers';
import consumer from 'channels/consumer';
import debounced from 'debounced';
debounced.initialize({ ...debounced.events, input: { wait: 650 } });

const application = Application.start();
const context = require.context('controllers', true, /_controller\.js$/);
application.load(definitionsFromContext(context));

StimulusReflex.initialize(application, { consumer });
StimulusReflex.debug = process.env.RAILS_ENV === 'development';
application.stimulusUseDebug = process.env.NODE_ENV === 'development';
