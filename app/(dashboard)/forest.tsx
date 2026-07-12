/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Leaf, Award, Compass, Zap, Flame } from 'lucide-react-native';
import { useGlobalState } from '../_layout';
import EcosystemTree from '../../components/EcosystemTree';

export default function ForestScreen() {
  const { committedGoal, completedTasks } = useGlobalState();
  const [energyPoints, setEnergyPoints] = useState(45);

  const completedCount = completedTasks.length;

  // Dynamically calculate ecosystem score based on daily completion percent
  const score = Math.min(100, 30 + completedCount * 23);

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1 px-6 pt-12" showsVerticalScrollIndicator={false}>
        <View className="max-w-md mx-auto w-full pb-20">
          
          {/* Header section */}
          <View className="mb-6">
            <Text className="text-2xl font-serif text-white font-bold tracking-tight">
              My Habitat Forest
            </Text>
            <Text className="text-3xs text-[#10b981] font-mono uppercase tracking-widest mt-1 font-bold">
              Energy-Efficient Local Vector Rendering
            </Text>
          </View>

          {/* Svg Tree Illustration Card */}
          <View className="mb-6 items-center">
            <EcosystemTree score={score} completedCount={completedCount} />
          </View>

          {/* Quick Stats Grid */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-[#000814] border border-[#002246] p-4 rounded-2xl items-center">
              <Flame className="w-5 h-5 text-orange-500 mb-2" />
              <Text className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-0.5">
                Habitat State
              </Text>
              <Text className="text-lg font-bold text-white font-serif">
                {completedCount === 3 ? 'Flourishing' : completedCount > 0 ? 'Sprouting' : 'Dormant'}
              </Text>
            </View>

            <View className="flex-1 bg-[#000814] border border-[#002246] p-4 rounded-2xl items-center">
              <Zap className="w-5 h-5 text-amber-500 mb-2" />
              <Text className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-0.5">
                Pixel State
              </Text>
              <Text className="text-lg font-bold text-white font-serif">
                OLED Saving
              </Text>
            </View>
          </View>

          {/* Environmental facts panel */}
          <View className="bg-[#000814] border border-[#002246] p-5 rounded-3xl">
            <View className="flex-row items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-[#10b981]" />
              <Text className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                Why On-Device Vectors Matter?
              </Text>
            </View>
            <Text className="text-3xs text-slate-400 leading-relaxed font-sans mb-3">
              Traditional web or mobile games rely on canvas pipelines or heavy WebGL meshes which drain physical cell battery and raise local CPU temperatures by forcing continuous draw loop renders.
            </Text>
            <Text className="text-3xs text-slate-400 leading-relaxed font-sans">
              This ecosystem leverages lightweight, declarative SVG shapes driven completely on native drawing threads. It only updates its structural components when your completion status shifts, keeping compute emissions close to absolute zero.
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
