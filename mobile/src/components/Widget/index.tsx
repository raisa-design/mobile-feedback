import React, {useRef, useState} from  'react';
import {View, TouchableOpacity} from 'react-native';
import {ChatTeardropDots} from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';

import { Options } from './Options';
import {Forms} from '../Forms'
import { Sucess } from '../Sucess';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export type FeedbackType = keyof typeof feedbackTypes

function Widget(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const bottomSheetRef =useRef<BottomSheet>(null);

    function handleOpen(): void{
        bottomSheetRef.current?.expand();
    }

    function handleRestartFeedback(){
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    function handleFeedbackSent(){
        setFeedbackSent(true);
    }
    return(
    <>
        <TouchableOpacity 
            style={styles.button}
            onPress={handleOpen}
            >
            <ChatTeardropDots 
            size={24}
            weight="bold"
            color={theme.colors.text_on_brand_color}
            />

          
        </TouchableOpacity>

        <BottomSheet 
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        >
            {
                feedbackSent ?
                    <Sucess onSendAnotherFeedback={handleRestartFeedback}/>
                :
                <>
                    {
                        feedbackType ?
                        <Forms 
                          feedbackType={feedbackType}
                          onFeedbackCanceled={handleRestartFeedback}
                          onFeedbackSent={handleFeedbackSent}
                        />
                        :
                        <Options  onFeedbackTypeChanged={setFeedbackType}/>
                    }
                </>
            }

      
        </BottomSheet>
    </>
    )
}

export default gestureHandlerRootHOC(Widget);
