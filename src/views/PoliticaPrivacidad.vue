<template>
  <div class="legal-page">
    <section class="hero">
      <div class="container hero-content">
        <h1>{{ t.title }}</h1>
        <p>{{ t.updated }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="legal-body">

          <p class="lead">{{ t.lead }}</p>
          <p>{{ t.intro1 }}</p>
          <p>{{ t.intro2 }}</p>

          <h2>{{ t.s1Title }}</h2>
          <p>{{ t.s1p1 }}</p>
          <p>{{ t.s1p2 }}</p>

          <h2>{{ t.s2Title }}</h2>
          <p>{{ t.s2p1 }}</p>
          <p>{{ t.s2p2 }}</p>
          <p>{{ t.s2p3 }} <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a>.</p>

          <h2>{{ t.bookingTitle }}</h2>
          <p>{{ t.bookingFields }}</p>
          <p>{{ t.bookingPurpose }}</p>
          <p>{{ t.bookingLegalBasis }}</p>
          <p>{{ t.bookingRetention }}</p>
          <p>{{ t.bookingProcessors }}</p>
          <p>{{ t.bookingRights }} <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a>.</p>

          <h2>{{ t.s3Title }}</h2>
          <p>{{ t.s3intro }}</p>
          <ul>
            <li v-for="right in t.s3rights" :key="right">{{ right }}</li>
          </ul>
          <p>{{ t.s3outro }}</p>

          <h2>{{ t.s4Title }}</h2>
          <p>{{ t.s4p1 }}</p>

          <h2>{{ t.s5Title }}</h2>
          <p>{{ t.s5p1 }}</p>

          <h2>{{ t.s6Title }}</h2>
          <p>{{ t.s6p1 }}</p>

          <h2>{{ t.s7Title }}</h2>
          <p>{{ t.s7p1 }} <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a>.</p>

          <div class="legal-contact-box">
            <p><strong>{{ t.contactController }}</strong> Boat Solutions International S.L.</p>
            <p><strong>{{ t.contactEmail }}</strong> <a href="mailto:info@boat-solutions.es">info@boat-solutions.es</a></p>
            <p><strong>{{ t.contactPhone }}</strong> <a href="tel:+34676625595">+34 676 625 595</a></p>
            <p><strong>{{ t.contactLocation }}</strong> {{ t.contactLocationValue }}</p>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/useMeta'

const { lang } = useLanguage()

const t = computed(() => lang.value === 'en' ? {
  title: 'Privacy Policy',
  updated: 'Last updated: October 2026',
  lead: 'The BSI – Boat Solutions International website is owned by Boat Solutions International S.L., which acts as the data controller for your personal data.',
  intro1: 'We have adopted this Privacy Policy, which determines how we process information collected by BSI – Boat Solutions International, and explains why we need to collect certain personal data about you. You should therefore read this Privacy Policy before using the website.',
  intro2: 'We care about your personal data and are committed to ensuring its confidentiality and security.',
  s1Title: 'Personal information we collect',
  s1p1: 'When you visit the BSI – Boat Solutions International website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products you view, the websites or search terms that referred you to the site, and how you interact with it. We refer to this automatically collected information as "Device Information".',
  s1p2: 'We may also collect the personal data you provide to us (including, but not limited to, name, surname, address and payment information) during registration, in order to fulfil the contract.',
  s2Title: 'Why do we process your data?',
  s2p1: 'Our priority is the security of user data. We therefore only process the minimum data necessary to maintain the website. Automatically collected information is used solely to identify potential cases of abuse and to establish statistical information about website usage. This statistical information is not aggregated in a way that would identify any individual user.',
  s2p2: 'You may visit the website without telling us who you are or revealing any information that could identify you. However, if you wish to use any of the website\'s features, receive our newsletter, or provide us with details via a form, you may need to provide us with personal data such as your email address, name, city of residence, organisation or phone number.',
  s2p3: 'You may choose not to provide us with your personal data, but in that case you may not be able to use some of the website\'s features. Users who have questions about what information is mandatory may contact us at',
  bookingTitle: 'Program booking requests',
  bookingFields: 'For program booking requests, we process the selected program and boat-length band, preferred date and time, name, email address, phone number, boat type, optional comments, and the privacy-consent timestamp.',
  bookingPurpose: 'Handle the booking request and pre-contractual communications, including checking availability, contacting you about the requested inspection and preparing the requested service information.',
  bookingLegalBasis: 'The legal basis for managing the booking request and taking pre-contractual steps at your request is Article 6(1)(b) GDPR. Consent is relied on only where applicable to a separate processing activity.',
  bookingRetention: 'We retain booking-request data only for as long as reasonably necessary to handle the request and any resulting pre-contractual relationship, and afterwards only where applicable legal obligations or the establishment, exercise or defence of claims require it. Retention periods may therefore depend on whether the request leads to a contract.',
  bookingProcessors: 'Service providers may process data on our behalf where needed to operate the booking workflow and communications. This may include Google services used to receive or manage form submissions, where applicable, under the provider arrangements and safeguards in force.',
  bookingRights: 'You may exercise your data-protection rights, withdraw consent where consent is the applicable basis, or ask about this processing by contacting',
  s3Title: 'Your rights',
  s3intro: 'If you are a resident of the European Economic Area, you have the following rights regarding your personal data:',
  s3rights: [
    'Right to be informed',
    'Right of access',
    'Right to rectification',
    'Right to erasure',
    'Right to restriction of processing',
    'Right to data portability',
    'Right to object',
    'Rights in relation to automated decision-making and profiling',
  ],
  s3outro: 'If you wish to exercise any of these rights, please contact us using the contact information at the end of this document.',
  s4Title: 'Links to other websites',
  s4p1: 'Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such websites or third parties. We encourage you to be aware when you leave our website and to read the privacy statements of each website that may collect personal information.',
  s5Title: 'Information security',
  s5p1: 'We protect the information you provide to us on computer servers in a controlled, secure environment, protected against unauthorised access, use or disclosure. We maintain reasonable administrative, technical and physical safeguards to protect against unauthorised access, use, modification and disclosure of personal data under our control and custody.',
  s6Title: 'Legal disclosure',
  s6p1: 'We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.',
  s7Title: 'Contact information',
  s7p1: 'If you wish to contact us to obtain more information about this Policy or to discuss any matter relating to your individual rights and your personal data, you may send us an email at',
  contactController: 'Data controller:',
  contactEmail: 'Contact email:',
  contactPhone: 'Phone:',
  contactLocation: 'Location:',
  contactLocationValue: 'Vigo, Pontevedra, Spain',
} : {
  title: 'Política de Privacidad',
  updated: 'Última actualización: octubre de 2026',
  lead: 'El sitio web de BSI - Boat Solutions International es propiedad de Boat Solutions International S.L., que actúa como responsable del tratamiento de sus datos personales.',
  intro1: 'Hemos adoptado esta Política de Privacidad, que determina cómo tratamos la información recopilada por BSI - Boat Solutions International, y explica los motivos por los que necesitamos recopilar ciertos datos personales sobre usted. Por tanto, debe leer esta Política de Privacidad antes de utilizar el sitio web.',
  intro2: 'Nos preocupamos por sus datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.',
  s1Title: 'Información personal que recopilamos',
  s1p1: 'Cuando visita el sitio web de BSI - Boat Solutions International, recopilamos automáticamente cierta información sobre su dispositivo, incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en su dispositivo. Además, mientras navega por el sitio, recopilamos información sobre las páginas web o productos individuales que visualiza, los sitios web o términos de búsqueda que le han referido al sitio, y cómo interactúa con él. Nos referimos a esta información recopilada automáticamente como «Información del dispositivo».',
  s1p2: 'Asimismo, podemos recopilar los datos personales que usted nos proporcione (incluyendo, entre otros, nombre, apellidos, dirección e información de pago) durante el registro, con el fin de poder cumplir el contrato.',
  s2Title: '¿Por qué tratamos sus datos?',
  s2p1: 'Nuestra prioridad es la seguridad de los datos de los usuarios. Por ello, únicamente tratamos los datos mínimos imprescindibles para mantener el sitio web. La información recopilada automáticamente se utiliza exclusivamente para identificar posibles casos de abuso y establecer información estadística sobre el uso del sitio web. Esta información estadística no se agrega de manera que permita identificar a ningún usuario concreto.',
  s2p2: 'Puede visitar el sitio web sin indicarnos quién es ni revelar ninguna información que permita identificarle. Sin embargo, si desea utilizar alguna de las funciones del sitio web, recibir nuestra newsletter o proporcionarnos detalles a través de un formulario, puede que necesite facilitarnos datos personales como su correo electrónico, nombre, apellidos, ciudad de residencia, organización o número de teléfono.',
  s2p3: 'Puede optar por no facilitarnos sus datos personales, pero en ese caso es posible que no pueda utilizar algunas funciones del sitio web. Los usuarios que tengan dudas sobre qué información es obligatoria pueden contactarnos en',
  bookingTitle: 'Solicitudes de reserva de programas',
  bookingFields: 'En las solicitudes de reserva de programas tratamos el programa y la franja de eslora seleccionados, la fecha y hora preferidas, nombre, correo electrónico, teléfono, tipo de embarcación, comentarios opcionales y la marca temporal del consentimiento de privacidad.',
  bookingPurpose: 'Gestionar la solicitud de reserva y las comunicaciones precontractuales, incluida la comprobación de disponibilidad, el contacto sobre la revisión solicitada y la preparación de la información del servicio pedido.',
  bookingLegalBasis: 'La base jurídica para gestionar la solicitud de reserva y adoptar medidas precontractuales a petición del interesado es el artículo 6.1.b) del RGPD. El consentimiento se utilizará únicamente cuando resulte aplicable a una actividad de tratamiento distinta.',
  bookingRetention: 'Conservaremos los datos de la solicitud solo durante el tiempo razonablemente necesario para gestionarla y atender la posible relación precontractual; después, únicamente cuando lo exijan obligaciones legales aplicables o la formulación, ejercicio o defensa de reclamaciones. Por ello, el plazo puede variar según la solicitud llegue o no a convertirse en contrato.',
  bookingProcessors: 'Los proveedores de servicios podrán tratar datos por cuenta de Boat Solutions cuando sea necesario para operar el flujo de reservas y las comunicaciones. Esto puede incluir, cuando corresponda, servicios de Google utilizados para recibir o gestionar envíos de formularios, bajo los acuerdos y garantías vigentes del proveedor.',
  bookingRights: 'Puede ejercer sus derechos de protección de datos, retirar el consentimiento cuando esa sea la base aplicable o consultar este tratamiento escribiendo a',
  s3Title: 'Sus derechos',
  s3intro: 'Si es residente en el Espacio Económico Europeo, tiene los siguientes derechos en relación con sus datos personales:',
  s3rights: [
    'Derecho a ser informado',
    'Derecho de acceso',
    'Derecho de rectificación',
    'Derecho de supresión',
    'Derecho a la limitación del tratamiento',
    'Derecho a la portabilidad de los datos',
    'Derecho de oposición',
    'Derechos en relación con la toma de decisiones automatizada y la elaboración de perfiles',
  ],
  s3outro: 'Si desea ejercer alguno de estos derechos, póngase en contacto con nosotros a través de la información de contacto que figura al final de este documento.',
  s4Title: 'Enlaces a otros sitios web',
  s4p1: 'Nuestro sitio web puede contener enlaces a otros sitios web que no son de nuestra propiedad ni están bajo nuestro control. Tenga en cuenta que no somos responsables de las prácticas de privacidad de dichos sitios web ni de terceros. Le recomendamos que esté atento cuando abandone nuestro sitio web y que lea las declaraciones de privacidad de cada sitio que pueda recopilar información personal.',
  s5Title: 'Seguridad de la información',
  s5p1: 'Protegemos la información que usted nos facilita en servidores informáticos en un entorno controlado y seguro, protegido contra el acceso, uso o divulgación no autorizados. Mantenemos salvaguardias administrativas, técnicas y físicas razonables para proteger contra el acceso no autorizado, el uso, la modificación y la divulgación de datos personales bajo nuestro control y custodia.',
  s6Title: 'Divulgación legal',
  s6p1: 'Divulgaremos cualquier información que recopilemos, utilicemos o recibamos si así lo exige o permite la ley, por ejemplo, para cumplir una citación u otro proceso legal similar, y cuando creamos de buena fe que la divulgación es necesaria para proteger nuestros derechos, proteger su seguridad o la de otras personas, investigar fraudes o responder a una solicitud gubernamental.',
  s7Title: 'Información de contacto',
  s7p1: 'Si desea ponerse en contacto con nosotros para obtener más información sobre esta Política o tratar cualquier asunto relacionado con sus derechos individuales y sus datos personales, puede enviarnos un correo electrónico a',
  contactController: 'Responsable del tratamiento:',
  contactEmail: 'Email de contacto:',
  contactPhone: 'Teléfono:',
  contactLocation: 'Ubicación:',
  contactLocationValue: 'Vigo, Pontevedra, España',
})

usePageMeta({
  es: {
    title: 'Política de Privacidad',
    description: 'Política de privacidad de Boat Solutions International — cómo tratamos tus datos personales.',
  },
  en: {
    title: 'Privacy Policy',
    description: 'Boat Solutions International privacy policy — how we handle your personal data.',
  },
})
</script>

<style scoped>
.hero {
  background: var(--color-meteorite-dark);
  padding: 140px 20px 60px;
}

.hero-content {
  color: var(--color-light);
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.hero-content p {
  font-family: var(--font-body);
  opacity: 0.6;
  font-size: 0.9rem;
}

.legal-body {
  max-width: 780px;
  margin: 0 auto;
}

.lead {
  font-size: 1.1rem;
  color: var(--color-dark);
  line-height: 1.8;
  margin-bottom: 24px;
  font-weight: 500;
}

.legal-body h2 {
  font-size: 1.35rem;
  color: var(--color-dark);
  margin-top: 44px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-primary-light);
}

.legal-body p {
  color: var(--color-gray);
  line-height: 1.85;
  margin-bottom: 16px;
  font-size: 0.97rem;
}

.legal-body ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legal-body li {
  color: var(--color-gray);
  font-size: 0.97rem;
  padding-left: 20px;
  position: relative;
  line-height: 1.6;
}

.legal-body li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-size: 0.85rem;
}

.legal-body a {
  color: var(--color-primary);
  font-weight: 500;
  transition: opacity 0.2s;
}

.legal-body a:hover { opacity: 0.75; }

.legal-contact-box {
  margin-top: 44px;
  background: var(--color-gray-light);
  border-radius: 14px;
  padding: 28px 32px;
  border-left: 4px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legal-contact-box p {
  margin: 0;
  color: var(--color-dark);
  font-size: 0.93rem;
}
</style>
