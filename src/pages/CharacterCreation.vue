<template>
  <q-page>
    <div class="q-pa-md row justify-center">
      <div class="col-12 col-md-12 col-lg-8">
        <q-stepper ref="stepper" v-model="step" header-nav color="primary" animated>
          <q-step
            name="name"
            title="Name"
            icon="settings"
            :done="step != 'name'"
            :header-nav="step != 'name'"
          >
            You wake up on the outskirts of a village. You can't remember how you got there, or much
            about your life at all, but you're pretty sure your name is...
            <q-input
              ref="nameRef"
              v-model="state.name"
              label="Name"
              :lazy-rules="true"
              :dense="true"
              :rules="[(val) => val.length > 0 || 'You must have a name.']"
            >
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </q-step>
          <q-step
            name="race"
            title="Race"
            icon="settings"
            :done="step != 'race'"
            :header-nav="step != 'race'"
          >
            As you regain your senses, you become aware of your physique. From a quick observation
            you appear to be a...
            <div class="row">
              <q-card
                v-for="race in races"
                :key="race.id"
                dark
                bordered
                class="col-md-3 col-sm-12"
                :class="state.race?.id === race.id ? 'bg-blue-9' : 'bg-grey-8'"
              >
                <q-card-section>
                  <div class="text-h6">{{ race.name }}</div>
                  <div>{{ race.description }}</div>
                </q-card-section>
                <q-separator dark inset />
                <q-card-section>
                  <div>{{ race.effects.text }}</div>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn @click="onRaceSelect(race)">Choose {{ race.name }}</q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </q-step>
          <q-step
            name="class"
            title="Class"
            icon="settings"
            :done="step != 'class'"
            :header-nav="step != 'class'"
          >
            As you regain your senses, you become aware of your physique. From a quick observation
            you appear to be a...
            <div class="row">
              <q-card
                v-for="characterClass in characterClasses"
                :key="characterClass.id"
                dark
                bordered
                class="col-md-3 col-sm-12"
                :class="state.class?.id === characterClass.id ? 'bg-blue-9' : 'bg-grey-8'"
              >
                <q-card-section>
                  <div class="text-h6">{{ characterClass.name }}</div>
                  <div>{{ characterClass.description }}</div>
                </q-card-section>
                <q-separator dark inset />
                <q-card-section>
                  <div>Placeholder</div>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn @click="onClassSelect(characterClass)"
                    >Choose {{ characterClass.name }}</q-btn
                  >
                </q-card-actions>
              </q-card>
            </div>
          </q-step>
          <q-step
            name="confirm"
            title="Confirm"
            icon="settings"
            :done="step != 'confirm'"
            :header-nav="step != 'confirm'"
          >
            Continue with the following character?
            <p>Name: {{ state.name }}</p>
            <p>Race: {{ state.race?.name }}</p>
            <p>Class: {{ state.class?.name }}</p>
          </q-step>
          <template #navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step !== 'confirm'"
                color="primary"
                :label="'Continue'"
                :disable="!canProgress()"
                @click="($refs.stepper as typeof QStepper).next()"
              />
              <q-btn
                v-else
                color="primary"
                :label="'Submit'"
                :disable="!canSubmit()"
                @click="submit()"
              />
              <q-btn
                v-if="step != 'name'"
                flat
                color="primary"
                label="Back"
                class="q-ml-sm"
                @click="($refs.stepper as typeof QStepper).previous()"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { QStepper, QInput } from 'quasar';
import { ICharacterRaceDataModel, races } from 'src/models/character/races';
import { characterClasses, ICharacterClassDataModel } from 'src/models/character/character-classes';
import { useUserStore } from 'stores/user';
import { useSceneStore } from 'src/stores/scene';
import { Character } from 'src/models/character/character';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const sceneStore = useSceneStore();

    const step = ref('name');
    const nameRef = ref<typeof QInput | null>(null);

    const state = reactive({
      name: '',
      race: null as null | ICharacterRaceDataModel,
      class: null as null | ICharacterClassDataModel,
    });

    const rules: { [key: string]: () => boolean } = {
      name: () => state.name.length > 0,
      race: () => !!state.race,
      class: () => !!state.class,
    };

    function canProgress() {
      return rules[step.value]();
    }

    function canSubmit() {
      return Object.values(rules).every((rule) => rule());
    }

    function onClassSelect(selected: ICharacterClassDataModel) {
      state.class = selected;
    }

    function onRaceSelect(selected: ICharacterRaceDataModel) {
      state.race = selected;
    }

    function submit() {
      if (!state.race || !state.class) {
        return;
      }

      const character = new Character({
        name: state.name,
        race: state.race,
        characterClass: state.class,
      });
      userStore.setPlayerCharacter(character);

      sceneStore.setSceneByName('intro');
    }

    return {
      // Components
      QStepper,
      // state
      state,
      // refs
      nameRef,
      // functions
      canProgress,
      canSubmit,
      onClassSelect,
      onRaceSelect,
      submit,
      //data
      races,
      characterClasses,
      rules,
      step,
    };
  },
});
</script>

<style scoped></style>
