"use client";
import { FontSizeTypes } from "@/api/typing/typing.type";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import {
  CursorStyles,
  SettingLocal,
  typingStylesType,
  WordAmountType,
  WordTimeType,
} from "@/app/(home)/typing/modules/types";
import { LinearOrUrl } from "@/components/project/types";
import { useCountDown } from "@/hooks/useCountDown";
import { useRunningTime } from "@/hooks/useRunningTime";
import { createContext, useContext, useEffect, useState } from "react";

export type settingType = {
  id: Id;
  title: string;
  rect?: DOMRect;
  theme: string;
  href?: string;
  img?: LinearOrUrl;
};

type defaltValuesType = {
  typingStyles: typingStylesType;
  wordAmount: WordAmountType;
  wordTime: WordTimeType;
  secondsOfTimeWords: number;
  wordApi: [];
  setIsCountDown: (val: boolean) => void;
  resetCountDownIsInitial: () => void;
  wordList: any;
  setWordList: (val: any) => void;
  typingWordIndex: number;
  hideOverlay: boolean;
  secondsOfManyWords: number;
  cursorIsTyping: boolean;
  singleTypingList: any;
  loadingTypingWordList: boolean;
  setLoadingTypingWordList: (val: boolean) => void;
  setSingleTypingList: (val: []) => void;
  setSecondsOfManyWords: (val: boolean) => void;
  typingListSetting: boolean;
  typingFullScreen: boolean;
  setTypingFullScreen: (val: boolean) => void;
  setTypingListSetting: (val: boolean) => void;
  setCursorIsTyping: (val: boolean) => void;
  resetRunningManyWords: () => void;
  showResults: boolean;
  showPopupCreate: boolean;
  currentlyPickedSetting: settingType;
  isCaplock: boolean;
  rect: DOMRect | null;
  cursorShape: CursorStyles;
  typingSettingLocal: SettingLocal | undefined;
  textIsLowercase: boolean;
  typingFontsize: FontSizeTypes;
  setTypingFontsize: (val: FontSizeTypes) => void;
  setTextIsLowercase: (val: boolean) => void;
  setTypingSettingLocal: (val: SettingLocal) => void;
  setCursorShape: (val: CursorStyles) => void;
  setRect: (val: DOMRect) => void;
  setIsCaplock: (val: boolean) => void;
  setCurrentlyPickedSetting: ({ id, title, rect }: settingType) => void;
  setShowPopupCreate: (val: boolean) => void;
  setShowResults: (val: boolean) => void;
  setHideOverlay: (val: boolean) => void;
  setTypingWordIndex: (val: any) => void;
  setWordAmount: (val: WordAmountType) => void;
  setWordTime: (val: WordTimeType) => void;
  setTypingStyles: (val: typingStylesType) => void;
};

const defaultValues: defaltValuesType = {
  typingStyles: "words",
  wordAmount: 10,
  wordTime: 15,
  secondsOfTimeWords: 15,
  wordApi: [],
  setIsCountDown: () => {},
  resetCountDownIsInitial: () => {},
  typingWordIndex: 0,
  hideOverlay: true,
  showResults: false,
  setHideOverlay: () => {},
  singleTypingList: [],
  setSingleTypingList: () => {},
  secondsOfManyWords: 0,
  cursorIsTyping: false,
  showPopupCreate: false,
  wordList: [],
  setWordList: () => {},
  typingListSetting: false,
  currentlyPickedSetting: { id: 0, title: "nothing", theme: "" },
  isCaplock: false,
  typingFullScreen: false,
  rect: null,
  cursorShape: "underline",
  typingSettingLocal: undefined,
  loadingTypingWordList: true,
  textIsLowercase: false,
  typingFontsize: 1,
  setTypingFontsize: () => {},
  setTextIsLowercase: () => {},
  setLoadingTypingWordList: () => {},
  setTypingSettingLocal: () => {},
  setCursorShape: () => {},
  setRect: () => {},
  setTypingFullScreen: () => {},
  setIsCaplock: () => {},
  setCurrentlyPickedSetting: () => {},
  setTypingListSetting: () => {},
  setShowPopupCreate: () => {},
  setCursorIsTyping: () => {},
  setSecondsOfManyWords: () => {},
  resetRunningManyWords: () => {},
  setShowResults: () => {},
  setTypingWordIndex: () => {},
  setWordAmount: () => {},
  setWordTime: () => {},
  setTypingStyles: () => {},
};

const TypingContext = createContext(defaultValues);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingStyles, setTypingStyles] = useState<typingStylesType>("combine");
  const [wordAmount, setWordAmount] = useState<WordAmountType>(10);
  const [wordTime, setWordTime] = useState<WordTimeType>(15);
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cursorIsTyping, setCursorIsTyping] = useState(false);
  const [typingListSetting, setTypingListSetting] = useState(false);
  const {
    seconds: secondsOfManyWords,
    setIsRunning: setSecondsOfManyWords,
    resetRunning: resetRunningManyWords,
  } = useRunningTime();
  const {
    seconds: secondsOfTimeWords,
    setIsCountDown,
    resetCountDownIsInitial,
  } = useCountDown(wordTime);
  const [wordApi, setWordApi] = useState<[]>([]);
  const [showPopupCreate, setShowPopupCreate] = useState(false);
  const [wordList, setWordList] = useState<any>([]);
  const [singleTypingList, setSingleTypingList] = useState<[]>([]);
  const [currentlyPickedSetting, setCurrentlyPickedSetting] =
    useState<settingType>({ id: 0, title: "nothing", theme: "" });
  const [isCaplock, setIsCaplock] = useState<boolean>(false);
  const [textIsLowercase, setTextIsLowercase] = useState<boolean>(false);
  const [typingFullScreen, setTypingFullScreen] = useState<boolean>(false);
  const [loadingTypingWordList, setLoadingTypingWordList] =
    useState<boolean>(true);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cursorShape, setCursorShape] = useState<CursorStyles>("line");
  const [typingFontsize, setTypingFontsize] = useState<FontSizeTypes>(1);
  const [wordGap, setWordGap] = useState();
  const initialTypingSettingLocals: SettingLocal = {
    cursorShape: "line",
    typingStyles: "combine",
    wordAmount: 10,
    wordTime: 15,
    textIsLowercase: false,
  };
  const [typingSettingLocal, setTypingSettingLocal] = useState<SettingLocal>();

  // Fetch & update typingSetting localStorage
  useEffect(() => {
    if (typingSettingLocal === undefined) return;
    // if (typingSettingLocal === initialTypingSettingLocals) return;
    const newSetting = {
      cursorShape,
      typingStyles,
      wordAmount,
      wordTime,
      textIsLowercase,
    };
    setTypingSettingLocal(newSetting);
    localStorage.setItem("typing-setting", JSON.stringify(newSetting));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorShape, typingStyles, wordAmount, wordTime, textIsLowercase]);
  useEffect(() => {
    async function fetchTypingSettingFromLocalStorage() {
      let setting = null;
      try {
        const stored = localStorage.getItem("typing-setting");
        if (stored) setting = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (setting !== null) {
        setTypingSettingLocal(setting);
        setTypingStyles(setting?.typingStyles);
        setWordAmount(setting?.wordAmount);
        setWordTime(setting?.wordTime);
        setCursorShape(setting?.cursorShape);
        setTextIsLowercase(setting?.textIsLowercase);
      } else {
        setTypingSettingLocal(initialTypingSettingLocals);
        setTypingStyles(initialTypingSettingLocals?.typingStyles);
        setWordAmount(initialTypingSettingLocals?.wordAmount);
        setWordTime(initialTypingSettingLocals?.wordTime);
        setCursorShape(initialTypingSettingLocals?.cursorShape);
        setTextIsLowercase(initialTypingSettingLocals?.textIsLowercase);
      }
    }
    fetchTypingSettingFromLocalStorage();
  }, []);

  // Fetch & update word lists
  useEffect(() => {
    setLoadingTypingWordList(true);
    async function fetchWordListFromLocalStorage() {
      let lists = null;
      try {
        const stored = localStorage.getItem("wordList");
        if (stored) lists = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (lists !== null && lists.length > 0) {
        setWordList(lists);
      }
      setLoadingTypingWordList(false);
    }
    fetchWordListFromLocalStorage();
  }, []);
  //
  useEffect(() => {
    if (wordList.length <= 0) return;
    localStorage.setItem("wordList", JSON.stringify(wordList));
  }, [wordList]);

  // Dynamic Caps Lock On & Off
  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      const isCapsLockBoolean =
        e.getModifierState && e.getModifierState("CapsLock");
      setIsCaplock(isCapsLockBoolean);
      console.log("Caps Lock On:", isCapsLockBoolean);
    };

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  // get api from Random-Word-Api
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getRandomWordApi(25, 6);
  //     setWordApi(data);
  //     console.log("random word api", data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <TypingContext.Provider
      value={{
        wordTime,
        wordAmount,
        wordApi,
        showResults,
        hideOverlay,
        typingStyles,
        typingWordIndex,
        cursorIsTyping,
        secondsOfManyWords,
        secondsOfTimeWords,
        showPopupCreate,
        wordList,
        typingListSetting,
        currentlyPickedSetting,
        isCaplock,
        typingFullScreen,
        singleTypingList,
        rect,
        cursorShape,
        typingSettingLocal,
        loadingTypingWordList,
        textIsLowercase,
        typingFontsize,
        setTypingFontsize,
        setTextIsLowercase,
        setLoadingTypingWordList,
        setTypingSettingLocal,
        setCursorShape,
        setRect,
        setSingleTypingList,
        setTypingFullScreen,
        setIsCaplock,
        setCurrentlyPickedSetting,
        setTypingListSetting,
        setWordList,
        setShowPopupCreate,
        setIsCountDown,
        resetCountDownIsInitial,
        setWordTime,
        setCursorIsTyping,
        setSecondsOfManyWords,
        resetRunningManyWords,
        setWordAmount,
        setTypingWordIndex,
        setShowResults,
        setTypingStyles,
        setHideOverlay,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
