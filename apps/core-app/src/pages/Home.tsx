import { HausLayout } from '@daohaus/daohaus-connect-feature';
import {
  CoreFieldLookup,
  FieldLego,
  FormBuilder,
  FormLego,
} from '@daohaus/haus-form-builder';
import { Tooltip } from '@daohaus/ui';

const sampleDefaultData = {
  daoContract: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
  daoName: 'DAO Name here',
};

const AppFieldLookup = {
  tooltip: Tooltip,
};

const tooltipTest: FieldLego<typeof AppFieldLookup> = {
  type: 'tooltip',
  content: 'This is a tooltip',
  side: 'left',
};

export const CustomFields = { ...CoreFieldLookup, ...AppFieldLookup };
type CustomFields = typeof CustomFields;

const TestForm: FormLego<CustomFields> = {
  id: 'test',
  title: 'Test Form',
  subtitle: 'This is a test form',
  description: 'This is a test form',
  fields: [tooltipTest, { type: 'input', id: 'foo' }],
};

export function Home() {
  return (
    <HausLayout navLinks={[{ label: 'NavLink', href: '/' }]}>
      <FormBuilder<CustomFields>
        form={TestForm}
        customFields={CustomFields}
        onSubmit={() => console.log('test')}
        defaultValues={sampleDefaultData}
      />
    </HausLayout>
  );
}

export default Home;
