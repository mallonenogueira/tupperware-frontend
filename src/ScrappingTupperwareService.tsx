export default class ScrappingTupperwareResources {
  constructor(public frameSelector: string) {}

  getFrame() {
    return (
      document &&
      document.querySelector &&
      document.querySelector<HTMLIFrameElement>(this.frameSelector)
    );
  }

  getFrameDocument() {
    const myFrame = this.getFrame();

    if (myFrame) {
      return myFrame.contentDocument;
    }

    throw new Error("IFrame não foi encontrado!");
  }

  getEl(selector: string) {
    const frameDocument = this.getFrameDocument();

    if (frameDocument) {
      const el = frameDocument.querySelector(selector);

      if (el) {
        return el;
      }

      return null;
    }

    throw new Error("FrameDocument não foi encontrado!");
  }

  sendElementAction(
    selector: string,
    action: (el: any) => void,
    errorMessage: string
  ) {
    const el = this.getEl(selector);

    if (el) {
      const el2 = el;
      action(el2);
      return true;
    }

    throw new Error(errorMessage);
  }

  doLogout() {
    return this.sendElementAction(
      '[href="Logout.aspx"]',
      (el: HTMLLinkElement) => el.click(),
      "Botão logout não encontrado!"
    );
  }

  doLogin() {
    return (
      this.sendElementAction(
        "#ctl00_txtCodigo",
        (el: HTMLInputElement) => (el.value = "ID"),
        "Campo login não entrado!"
      ) &&
      this.sendElementAction(
        "#ctl00_txtSenha",
        (el: HTMLInputElement) => (el.value = "SENHA"),
        "Campo senha não entrado!"
      ) &&
      this.sendElementAction(
        "#ctl00_btnEntrar",
        (el: HTMLLinkElement) => el.click(),
        "Botão entrar não encontrado!"
      )
    );
  }

  doRedirectToPedidos() {
    return this.sendElementAction(
      '[href="Pedidos.aspx"]',
      (el: HTMLLinkElement) => el.click(),
      "Botão para pedidos não encontrado!"
    );
  }

  doOpenOfertas() {
    return this.sendElementAction(
      "#ctl00_ContentPlaceHolder1_btnOfertasH",
      (el: HTMLLinkElement) => el.click(),
      "Botão de ofertas não encontrado!"
    );
  }

  doExtract() {
    const frameDocument = this.getFrameDocument();

    const selector = "#ctl00_ContentPlaceHolder1_panProdutosD table tbody";

    const allTbody = Array.from(
      frameDocument!.querySelectorAll<HTMLTableSectionElement>(selector)
    );

    if (!allTbody || !allTbody.length) {
      throw new Error("Nenhuma lista de produtos encontrada!");
    }

    const tbodyArray = allTbody
      // .filter(Boolean)
      // .map(i => i.querySelector("tbody"))
      .filter(Boolean)
      .filter(i => i!.childElementCount > 2) as HTMLTableSectionElement[];

    if (!tbodyArray || !tbodyArray.length) {
      throw new Error("Nenhum produto na lista foi encontrado!");
    }

    const extractInfo = tbodyArray.map(tbody => {
      const texts = Array.from(tbody.querySelectorAll<HTMLSpanElement>("span"))
        .filter(Boolean)
        .map(span => span.innerHTML);

      const img = tbody.querySelector("img");

      return {
        img: img ? new URL(img.src).pathname : null,
        texts
      };
    });

    return extractInfo;
  }

  start(handleError?: Function) {
    return new Promise<any[]>((resolve, reject) => {
      const steps: Function[] = [
        this.doLogout,
        this.doLogout,
        this.doLogin,
        this.doRedirectToPedidos,
        this.doOpenOfertas,
        this.doExtract
      ];
      let currentStep = 0;
      let stepResponses: any[] = [];

      const interval = setInterval(() => {
        try {
          if (currentStep === steps.length) {
            clearInterval(interval);
            resolve(stepResponses);
            return;
          }

          const stepResponse = steps[currentStep].call(this);

          if (stepResponse) {
            stepResponses.push(stepResponse);
            currentStep++;
          }
        } catch (err) {
          if (handleError) {
            handleError({
              err,
              reject,
              interval,
              resolve
            });
            return;
          }
          clearInterval(interval);
          reject(err);
        }
      }, 1500);
    });
  }
}
