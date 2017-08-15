import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

import addBugsGame from './add-bugs.js';
import moreCountGame from './more-count.js';
import moneyGame from './money.js';
import threedShapesGame from './three-d-shapes.js';
import dataGraphsGame from './data-graphs.js';
import crayFishGame from './count-cray-fish.js';
import subtractSkinksGame from './subtract-skinks.js';
import groupTadpoles from './group-tadpoles.js';
import shareCicadas from './share-cicadas.js';
import beadsGame from './beads.js';
import shapesGame from './shapes.js';
import possumPatternsGame from './possum-patterns.js';
import pythonPatterns from './python-patterns.js';
import lengthGame from './length.js';
import areaGame from './area.js';
import volumeGame from './volume.js';
import capacityGame from './capacity.js';
import massGame from './mass.js';
import timeGame from './time.js';
import twodShapeGames from './two-d-shapes.js';
import position from './position.js';
import chanceProbability from './chance-probability.js';
import placeValue from './place-value.js';
import additionGame from './addition.js';
import countByGames from './count-by';
import countToGames from './count-to';
import onesPatternsGame from './ones-patterns.js';
import twosPatternsGame from './twos-patterns.js';
import fivesPatternsGame from './fives-patterns.js';
import tensPatterns from './tens-patterns.js';
import oddAndEvensGames from './odd-and-even.js';
import subtractionGames from './subtraction.js';
import multiplicationGames from './multiplication.js';
import fractions from './fractions';
import divisionGame from './division.js';
import numberOrdering from './number-ordering.js';
import forwardPatternsGame from './forward-patterns.js';
import backwardPatternsGame from './backward-patterns.js';
import roundingToGame from './rounding-to.js';

import gameHeader from '../components/game-header/index.js';
import gameFooter from '../components/game-footer/index.js';
import gameSubMenu from '../components/game-sub-menu/index';
import gameImages from '../components/game-images/index.js';
import workArea from '../components/work-area/index.js';
import leftPanel from '../components/panel-left/index.js';
import rightPanel from '../components/panel-right/index.js';
import bottomPanel from '../components/panel-bottom/index.js';
//import baseline from '../components/baseline/index.js';
import numPad from '../components/num-pad/index.js';
import sketchPad from '../components/sketch-pad/index.js';
import infoPanel from '../components/info-panel/index.js';
import scoreboard from '../components/scoreboard/index.js';
import checkButton from '../components/check-button/index.js';


var moduleName = 'app.games';

angular
  .module(moduleName, [
    angularUIRouter,

    
    addBugsGame,
    moreCountGame,
    moneyGame,
    threedShapesGame,
    crayFishGame,
    subtractSkinksGame,
    groupTadpoles,
    shareCicadas,
    beadsGame,
    shapesGame,
    possumPatternsGame,
    pythonPatterns,
    lengthGame,
    areaGame,
    volumeGame,
    capacityGame,
    massGame,
    timeGame,
    twodShapeGames,
    position,
    chanceProbability,
    dataGraphsGame,
    placeValue,
    additionGame,
    countByGames,
    countToGames,
    multiplicationGames,
    fractions,
    onesPatternsGame,
    twosPatternsGame,
    fivesPatternsGame,
    tensPatterns,
    oddAndEvensGames,
    subtractionGames,
    divisionGame,
    numberOrdering,
    forwardPatternsGame,
    backwardPatternsGame,
    roundingToGame
  ])
  .component('gameHeader', gameHeader)
  .component('gameFooter', gameFooter)
  .component('gameSubMenu', gameSubMenu)
  .component('leftPanel', leftPanel)
  .component('rightPanel', rightPanel)
  .component('bottomPanel', bottomPanel)
  .component('numPad', numPad)
  .component('workArea', workArea)
  .component('gameImages', gameImages)
  //.component('baseline', baseline)
  .component('sketchPad', sketchPad)
  .component('infoPanel', infoPanel)
  .component('scoreboard', scoreboard)
  .component('checkButton', checkButton);

export default moduleName;
